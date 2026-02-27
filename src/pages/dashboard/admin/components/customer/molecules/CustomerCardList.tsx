import Badge from "@/components/ui/Badge";
import { ButtonBase } from "@/components/ui/Button";
import DynamicSelect from "@/components/ui/DynamicSelect";
import { Text } from "@/components/ui/Text";
import { updateUserRole } from "@/lib/api-list/user";
import { confirmAlert } from "@/lib/helper/swal";
import { User } from "@/lib/types/auth";
import { Mail, Phone, ShieldCheck, User2 } from "lucide-react";
import { toast } from "next-toast";
import Image from "next/image";
import React, { useState } from "react";

function CustomerCardList({
  customer,
  onRefetch,
}: {
  customer: User;
  onRefetch: () => void;
}) {
  const handleChangeRole = async (userName: string, newRole: string) => {
    const result = await confirmAlert(
      `Change role of ${userName}?`,
      `Are you sure? You are about to change the role of ${userName}. This action cannot be undone!`,
      "Yes, change it!",
      "No, cancel",
    );

    if (result.isConfirmed) {
      try {
        const response = await updateUserRole({
          userID: customer.id,
          payload: { role: newRole },
        });
        if (response.code === "200") {
          onRefetch();
          setTimeout(() => {
            toast.success("Role changed successfully");
          }, 500);
        }
      } catch (error: any) {
        toast.error("Failed to change role. please try again");
      }
    }
  };
  return (
    <div className="bg-white p-4 rounded-xl border border-white hover:border hover:border-primary">
      <div className="flex flex-col items-center text-center gap-4">
        {/* AVATAR SECTION */}
        <div className="relative aspect-square w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-gray-50">
          {customer.profilePictureUrl &&
          customer.profilePictureUrl.trim() !== "" ? (
            // <Image
            //   src={customer.profilePictureUrl}
            //   alt={customer.name}
            //   fill
            //   className="object-cover"
            // />
            <User2 size={32} className="text-primary" />
          ) : (
            <User2 size={32} className="text-primary" />
          )}
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-1 flex-col justify-center items-center gap-2 w-full">
          <Text variant="h3">{customer.name}</Text>

          <div className="flex flex-row justify-start items-center gap-2">
            <Mail size={16} className="text-primary" />
            <Text variant="p">{customer.email}</Text>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <Phone size={16} className="text-primary" />
            <Text variant="p">{customer.phoneNumber}</Text>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <ButtonBase
              label="Admin"
              shape="pill"
              size="md"
              type="button"
              variant={customer.role === "admin" ? "primary" : "outline"}
              eventClick={() => {
                handleChangeRole(customer.name, "admin");
              }}
              disabled={customer.role === "admin"}
            />
            <ButtonBase
              label="Customer"
              shape="pill"
              size="md"
              type="button"
              variant={customer.role === "user" ? "primary" : "outline"}
              eventClick={() => {
                handleChangeRole(customer.name, "user");
              }}
              disabled={customer.role === "user"}
            />
          </div>
          <Text variant="span" className="text-gray-400">
            Choose to change role
          </Text>
        </div>
      </div>
    </div>
  );
}

export default CustomerCardList;
