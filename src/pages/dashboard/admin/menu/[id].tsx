import DashboardLayout from "@/components/layouts/DashboardLayout";
import FoodForm from "@/components/modules/admin/menu/FoodForm";
import { Text } from "@/components/ui/Text";
import { getFoodbyID, updateFood } from "@/lib/api-list/food";
import { foodForm } from "@/lib/types/food";
import { toast } from "next-toast";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Edit() {
  const router = useRouter();
  const id = router.query.id;

  const [initialValue, setInitialValue] = useState({});

  const handleSubmit = async (form: {
    name: string;
    desc: string;
    price: number;
    priceDiscount: number;
    ingredients: string;
    imageUrl: string;
  }) => {
    const errors: string[] = [];
    if (form.name.length == 0) {
      toast.error("Name is required");
      errors.push("Name is required");
    }
    if (form.price <= 0) {
      toast.error("Price is required");
      errors.push("Price is required");
    }
    if (form.imageUrl.length == 0) {
      toast.error("Image is required");
      errors.push("Image is required");
    }

    if (errors.length > 0) {
      return;
    }

    const ingredientsFormatted: string[] = [];
    if (form.ingredients.length > 0) {
      const ingredientsRaw = form.ingredients.split(",");
      ingredientsRaw.map((item) =>
        ingredientsFormatted.push(capitalize(item.trim())),
      );
    }

    const payload = {
      name: form.name,
      description: form.desc,
      price: form.price,
      priceDiscount: form.priceDiscount,
      ingredients: form.ingredients.length > 0 ? ingredientsFormatted : [],
      imageUrl: form.imageUrl,
    };

    try {
      const response = await updateFood({ foodID: id as string, payload });
      if (response.code === "200") {
        toast.success("Menu created successfully");
        setTimeout(() => {
          router.replace("/dashboard/admin/menu/list");
        }, 500);
      } else {
        toast.error(response.errors?.[0]?.message || "Failed to create menu");
      }
    } catch (error: unknown) {
      toast.error(
        "Failed to update menu, please try again (error: an unknown error occurred)",
      );
    }
  };

  useEffect(() => {
    document.title = "Dashboard | Create Menu";
    const getDetail = async (id: string) => {
      try {
        const response = await getFoodbyID(id);
        if (response.code === "200") {
          setInitialValue({
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            priceDiscount: response.data.priceDiscount,
            ingredients: response.data.ingredients.join(","),
            imageUrl: response.data.imageUrl,
          });
        }
      } catch (error: unknown) {
        toast.error(
          "Failed to get food detail, please try again (error: an unknown error occurred)",
        );
      }
    };
    getDetail(id as string);
  }, [id]);

  return (
    <DashboardLayout>
      <div className="w-full  flex flex-col gap-4 sm:max-w-2xl sm:mx-auto">
        <Text variant="h3">Edit Menu</Text>
        <FoodForm
          onSubmit={handleSubmit}
          initialValue={{
            name: initialValue.name,
            description: initialValue.description,
            price: initialValue.price,
            priceDiscount: initialValue.priceDiscount,
            ingredients: initialValue.ingredients,
            imageUrl: initialValue.imageUrl,
          }}
        />
      </div>
    </DashboardLayout>
  );
}
