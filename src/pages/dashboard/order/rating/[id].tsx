import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ButtonBase } from "@/components/ui/Button";
import { StarRating, TextArea } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { createRating } from "@/lib/api-list/rating";
import { getTransactionbyID } from "@/lib/api-list/transaction";
import { order } from "@/lib/types/order";
import { Star, Utensils } from "lucide-react";
import { toast } from "next-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Rating() {
  const router = useRouter();
  const { id } = router.query;

  const [transaction, setTransaction] = useState<order>({} as order);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<
    Record<string, { rating: number; comment: string }>
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
    if (!id) return;
    try {
      const response = await getTransactionbyID({ id: id as string });
      if (response.code === "200") {
        setTransaction(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to load transaction data");
    }
  };

  const handleSubmit = async () => {
    const payload = Object.entries(reviews).map(([foodId, data]) => ({
      foodId,
      rating: data.rating,
      review: data.comment,
    }));

    // Validation: Check if all items in the transaction have been rated
    if (payload.length < (transaction.transaction_items?.length || 0)) {
      toast.error("Please provide a rating for every item in your order.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Tech Lead Tip: Use Promise.all to handle multiple async requests efficiently
      await Promise.all(payload.map((item) => createRating(item)));

      toast.success("Thank you! Your reviews have been submitted.");
      router.push("/dashboard/order");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to submit some reviews. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Rate Meal";
    getDetailTransaction();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto flex flex-col gap-8 pb-12">
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-3 justify-center items-center text-center">
          <div className="p-4 bg-primary/10 rounded-2xl border-2 border-primary/20">
            <Star className="w-8 h-8 text-primary fill-primary" />
          </div>
          <div>
            <Text variant="h4" className="font-extrabold text-gray-900">
              Rate your meal
            </Text>
            <Text variant="p" className="text-gray-400 font-mono text-sm">
              Transaction ID: {transaction?.invoiceId}
            </Text>
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="flex flex-col gap-6">
          {transaction?.transaction_items?.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-6 transition-all hover:border-primary/30"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="aspect-square object-cover rounded-2xl"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Text
                    variant="p"
                    className="font-bold text-gray-900 truncate"
                  >
                    {item.name}
                  </Text>
                  <Text
                    variant="span"
                    className="text-gray-400 text-xs line-clamp-1 italic"
                  >
                    {item.description}
                  </Text>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex flex-col gap-2 items-center sm:items-start">
                  <Text
                    variant="span"
                    className="text-xs font-bold uppercase tracking-widest text-gray-400"
                  >
                    Your Rating
                  </Text>
                  <StarRating
                    totalStars={5}
                    onRatingChange={(rating) =>
                      updateReview(item.id, "rating", rating)
                    }
                  />
                </div>

                <TextArea
                  label="Tell us your experience"
                  placeholder="The coffee was perfectly brewed..."
                  value={reviews[item.id]?.comment || ""}
                  onChange={(e) =>
                    updateReview(item.id, "comment", e.target.value)
                  }
                  charLimit={100}
                  className="bg-gray-50 border-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pt-4 sticky bottom-4">
          <ButtonBase
            label={
              isSubmitting ? "Submitting Reviews..." : "Submit All Reviews"
            }
            variant="primary"
            fullWidth
            shape="rounded"
            className="py-4 font-bold shadow-xl shadow-orange-100"
            eventClick={handleSubmit}
            isDisabled={isSubmitting}
          />
          <ButtonBase
            label="Maybe Later"
            variant="ghost"
            fullWidth
            eventClick={() => router.back()}
            isDisabled={isSubmitting}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Rating;
