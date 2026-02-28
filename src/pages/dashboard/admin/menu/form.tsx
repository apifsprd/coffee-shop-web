import DashboardLayout from "@/components/layouts/DashboardLayout";
import FoodForm from "@/components/modules/admin/menu/FoodForm";
import { ButtonBase } from "@/components/ui/Button";
import { TextArea, TextInput } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { createFood } from "@/lib/api-list/food";
import { toast } from "next-toast";
import { useRouter } from "next/router";
import React, { ChangeEvent, use, useEffect, useState } from "react";

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Form() {
  const router = useRouter();

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
      const response = await createFood({ payload });
      if (response.code === "200") {
        toast.success("Menu created successfully");
        setTimeout(() => {
          router.replace("/dashboard/admin/menu/list");
        }, 500);
      } else {
        toast.error(response.errors?.[0]?.message || "Failed to create menu");
      }
    } catch (error: any) {
      toast.error("Failed to create menu");
    }
  };

  useEffect(() => {
    document.title = "Dashboard | Create Menu";
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full  flex flex-col gap-4 sm:max-w-2xl sm:mx-auto">
        <Text variant="h3">Create New Menu</Text>
        <FoodForm onSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  );
}
