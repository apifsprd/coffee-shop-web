import Badge from "@/components/ui/Badge";
import { ButtonBase } from "@/components/ui/Button";
import DynamicSelect from "@/components/ui/DynamicSelect";
import { Text } from "@/components/ui/Text";
import { Mail, Phone, ShieldCheck, User } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function CustomerCardList({ customer, onUpdateRole }) {
  const [isEdit, setIsEdit] = useState(false);
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
            <User size={32} className="text-primary" />
          ) : (
            <User size={32} className="text-primary" />
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
            <Badge size="md" variant="primary">
              Role
            </Badge>
            <Badge size="md" variant="primary">
              Role
            </Badge>
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
