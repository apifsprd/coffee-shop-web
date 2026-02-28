import { ButtonBase } from "@/components/ui/Button";
import { TextArea, TextInput } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

export default function FoodForm({
  initialValue,
  onSubmit,
}: {
  initialValue?: {
    name: string;
    description: string;
    price: number;
    priceDiscount: number | null;
    ingredients: string;
    imageUrl: string;
  };
  onSubmit: (form: {
    name: string;
    desc: string;
    price: number;
    priceDiscount: number;
    ingredients: string;
    imageUrl: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    name: initialValue?.name || "",
    desc: initialValue?.description || "",
    price: initialValue?.price || 0,
    priceDiscount: initialValue?.priceDiscount || 0,
    ingredients: initialValue?.ingredients || "",
    imageUrl: initialValue?.imageUrl || "",
  });

  useEffect(() => {
    if (initialValue) {
      const handleSetinitialValue = () => {
        setForm({
          name: initialValue.name || "",
          desc: initialValue.description || "",
          price: initialValue.price || 0,
          priceDiscount: initialValue.priceDiscount || 0,
          ingredients: initialValue.ingredients || "",
          imageUrl: initialValue.imageUrl || "",
        });
      };
      handleSetinitialValue();
    }
  }, [initialValue]);

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-gray-200">
      <TextInput
        label="Name"
        inputPlaceholder="Name"
        inputOnChange={(text: ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, name: text.target.value })
        }
        inputValue={form.name}
        InputType="text"
        mandatory
      />
      <TextArea
        label="Description"
        placeholder="Enter description here (Optional)"
        onChange={(text) => setForm({ ...form, desc: text.target.value })}
        value={form.desc}
      />
      <div className="w-full flex flex-row gap-4">
        <div className="flex flex-1">
          <TextInput
            label="Price (Rp)"
            inputPlaceholder="Rupiah"
            inputOnChange={(text: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, price: parseFloat(text.target.value) })
            }
            inputValue={form.price}
            InputType="number"
            mandatory
          />
        </div>
        <div className="flex flex-1">
          <TextInput
            label="Discount (Rp)"
            inputPlaceholder="Rupiah"
            inputOnChange={(text: ChangeEvent<HTMLInputElement>) =>
              setForm({
                ...form,
                priceDiscount: parseFloat(text.target.value),
              })
            }
            inputValue={form.priceDiscount}
            InputType="number"
            mandatory
          />
        </div>
      </div>
      <TextArea
        label="Ingredients"
        placeholder="ex: Rice, Chicken, Egg, etc."
        onChange={(text) =>
          setForm({ ...form, ingredients: text.target.value })
        }
        value={form.ingredients}
      />
      <TextArea
        label="Image URL"
        placeholder="ex: https://example.com/image.jpg"
        onChange={(text) => setForm({ ...form, imageUrl: text.target.value })}
        value={form.imageUrl}
      />
      {form.imageUrl.length > 0 && (
        <div className="flex flex-col gap-2">
          <Text variant="span">Preview Image</Text>
          <Image
            src={form.imageUrl}
            alt={form.name}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      )}

      <div className="w-full flex flex-col gap-4">
        <ButtonBase
          fullWidth
          label="Create"
          eventClick={() => onSubmit(form)}
          type="button"
          variant="primary"
          size="lg"
        />
        <ButtonBase
          fullWidth
          label="Back"
          href="/dashboard/admin/menu/list"
          type="link"
          variant="outline"
          size="lg"
        />
      </div>
    </div>
  );
}
