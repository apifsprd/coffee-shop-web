import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ButtonBase } from "@/components/ui/Button";
import { StarRating, TextArea } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { createRating } from "@/lib/api-list/rating";
import { getTransactionbyID } from "@/lib/api-list/transaction";
import { order } from "@/lib/types/order";
import { Star } from "lucide-react";
import { toast } from "next-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Rating() {
  const router = useRouter();
  const id = router.query.id;

  const [transaction, setTransaction] = useState<order>({} as order);
  const [reviews, setReviews] = useState<
    Record<string, { foodId: string; rating: number; comment: string }>
  >({});

  const updateReview = (
    foodId: string,
    field: "rating" | "comment",
    value: any,
  ) => {
    setReviews((prev) => ({
      ...prev,
      [foodId]: {
        ...prev[foodId],
        [field]: value,
      },
    }));
  };
  const getDetailTransaction = async () => {
    try {
      const response = await getTransactionbyID({ id: id as string });
      if (response.code === "200") {
        setTransaction(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleSubmit = async () => {
    // 1. Ubah object reviews menjadi array yang bisa dipahami API
    const payload = Object.entries(reviews).map(([foodId, data]) => ({
      food_id: foodId, // Kita ambil ID dari Key object
      rating: data.rating,
      comment: data.comment,
    }));

    // 2. Validasi sederhana: Pastikan semua sudah diisi rating-nya
    if (payload?.length < transaction.transaction_items?.length) {
      toast.error("Please fill in all ratings.");
      return;
    }
    try {
      payload.map(async (item) => {
        await createRating({
          foodId: item.food_id,
          rating: item.rating,
          review: item.comment,
        });
      });
      toast.success("Rating submitted successfully!");
      // setTimeout(() => {
      //   router.push("/dashboard/order").then(() => {
      //     window.location.reload();
      //   });
      // }, 500);
    } catch (error) {
      console.error("Gagal mengirim ulasan:", error);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Rating";
    getDetailTransaction();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="p-4 flex flex-col justify-center items-center rounded-xl bg-primary">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <Text variant="h6">Rate your meal</Text>
            <Text variant="span" className="text-gray-400">
              {transaction?.invoiceId}
            </Text>
          </div>
        </div>

        {transaction?.transaction_items?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-start items-start bg-gray-50 border border-gray-100 rounded-xl p-4 gap-4"
          >
            <div
              key={index}
              className="flex flex-row justify-center items-center gap-2"
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={50}
                height={50}
                className="aspect-square object-cover rounded-xl"
              />
              <div>
                <Text variant="span">{item.name}</Text>
                <Text variant="p" className="text-gray-400">
                  {item.description}
                </Text>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <StarRating
                totalStars={5}
                onRatingChange={(rating) =>
                  updateReview(item.id, "rating", rating)
                }
              />
              <TextArea
                label="Tell us your experience"
                placeholder="the coffee was perfectly brewed and the food was delicious!"
                value={reviews[item.id]?.comment}
                onChange={(e) =>
                  updateReview(item.id, "comment", e.target.value)
                }
                charLimit={100}
                error={
                  reviews[item.id]?.comment?.length > 100
                    ? "Comment must be less than 100 characters"
                    : ""
                }
                helperText="You can write a maximum of 100 characters"
              />
            </div>
          </div>
        ))}

        <div className="w-full flex flex-col gap-4 mt-8">
          <ButtonBase
            label="Submit Review"
            variant="primary"
            fullWidth
            eventClick={handleSubmit}
          />
          <ButtonBase
            label="Maybe Later"
            variant="ghost"
            fullWidth
            eventClick={() => router.back()}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Rating;
