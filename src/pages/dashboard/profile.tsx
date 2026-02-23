import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ButtonBase } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { updateProfile } from "@/lib/api-list/user";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "next-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isEditMode, setIsEditMode] = useState(false);
  const [forms, setForms] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    profilePictureUrl: user?.profilePictureUrl || "",
  });

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/auth/login");
  };
  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile({ payload: forms });
      if (response.code === "200") {
        toast.success(response.message);
        router.reload();
        setIsEditMode(false);
      } else {
        toast.error(response.errors[0].message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Profile";
    setForms({
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      profilePictureUrl: user?.profilePictureUrl || "",
    });
  }, [user]);

  return (
    <DashboardLayout>
      <div className="w-full h-auto flex flex-col items-center gap-4">
        <div className="w-40 h-40 relative">
          <Image
            src={user?.profilePictureUrl || "/images/logo.png"}
            alt={`Logo`}
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="w-full flex flex-col gap-4">
          <TextInput
            label="Name"
            InputType="text"
            inputValue={forms.name}
            isDisabled={isEditMode ? false : true}
            labelStyle="text-black text-sm"
            inputOnChange={(e) => {
              setForms({ ...forms, name: e.target.value });
            }}
            inputPlaceholder=""
          />
          <TextInput
            label="Email"
            InputType="text"
            inputValue={forms.email}
            isDisabled={isEditMode ? false : true}
            labelStyle="text-black text-sm"
            inputOnChange={(e) => {
              setForms({ ...forms, email: e.target.value });
            }}
            inputPlaceholder=""
          />
          <TextInput
            label="Phone Number"
            InputType="text"
            inputValue={forms.phoneNumber}
            isDisabled={isEditMode ? false : true}
            labelStyle="text-black text-sm"
            inputOnChange={(e) => {
              setForms({ ...forms, phoneNumber: e.target.value });
            }}
            inputPlaceholder=""
          />
          {isEditMode && (
            <TextInput
              label="Photo Profile URL"
              InputType="text"
              inputValue={forms.profilePictureUrl}
              isDisabled={isEditMode ? false : true}
              labelStyle="text-black text-sm"
              inputOnChange={(e) => {
                setForms({ ...forms, profilePictureUrl: e.target.value });
              }}
              inputPlaceholder=""
            />
          )}
          <div className="w-full mt-4 flex flex-col gap-4">
            {isEditMode ? (
              <>
                <ButtonBase
                  label="Save Changes"
                  variant="primary"
                  eventClick={handleUpdateProfile}
                  fullWidth
                  shape="rounded"
                />
                <ButtonBase
                  label="Cancel"
                  variant="outline"
                  eventClick={() => setIsEditMode(false)}
                  fullWidth
                  shape="rounded"
                />
              </>
            ) : (
              <>
                <ButtonBase
                  label="Edit Profile"
                  variant="primary"
                  eventClick={() => setIsEditMode(true)}
                  fullWidth
                  shape="rounded"
                />
                <ButtonBase
                  label="Logout"
                  variant="outlineDanger"
                  eventClick={handleLogout}
                  fullWidth
                  shape="rounded"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
