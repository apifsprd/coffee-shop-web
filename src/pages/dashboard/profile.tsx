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
import { Camera } from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await updateProfile({ payload: forms });
      if (response.code === "200") {
        toast.success("Profile updated successfully!");
        setIsEditMode(false);
        // Better than reload: ideally, you'd update the Redux state here
        router.reload();
      } else {
        toast.error(response.errors?.[0]?.message || "Update failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Profile";
    if (user) {
      setForms({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        profilePictureUrl: user.profilePictureUrl || "",
      });
    }
  }, [user]);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto pb-10">
        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 relative border-4 border-white shadow-xl rounded-full overflow-hidden">
              <Image
                src={user?.profilePictureUrl || "/images/logo.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            {isEditMode && (
              <div className="absolute bottom-2 right-2 bg-primary p-2 rounded-full text-white shadow-lg cursor-pointer">
                <Camera size={20} />
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Text variant="h5" className="font-bold text-gray-900">
              {user?.name}
            </Text>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 gap-5">
            <TextInput
              label="Full Name"
              InputType="text"
              inputValue={forms.name}
              isDisabled={!isEditMode}
              labelStyle="font-semibold text-gray-700"
              inputOnChange={(e) =>
                setForms({ ...forms, name: e.target.value })
              }
            />

            <TextInput
              label="Email Address"
              InputType="email"
              inputValue={forms.email}
              isDisabled={!isEditMode}
              labelStyle="font-semibold text-gray-700"
              inputOnChange={(e) =>
                setForms({ ...forms, email: e.target.value })
              }
            />

            <TextInput
              label="Phone Number"
              InputType="tel"
              inputValue={forms.phoneNumber}
              isDisabled={!isEditMode}
              labelStyle="font-semibold text-gray-700"
              inputOnChange={(e) =>
                setForms({ ...forms, phoneNumber: e.target.value })
              }
            />

            {isEditMode && (
              <TextInput
                label="Profile Image URL"
                InputType="text"
                inputValue={forms.profilePictureUrl}
                labelStyle="font-semibold text-gray-700"
                inputOnChange={(e) =>
                  setForms({ ...forms, profilePictureUrl: e.target.value })
                }
              />
            )}

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex flex-col gap-3">
              {isEditMode ? (
                <>
                  <ButtonBase
                    label={loading ? "Saving..." : "Save Changes"}
                    variant="primary"
                    eventClick={handleUpdateProfile}
                    fullWidth
                    shape="rounded"
                    className="py-3 font-bold shadow-md shadow-orange-100"
                    isDisabled={loading}
                  />
                  <ButtonBase
                    label="Cancel"
                    variant="outline"
                    eventClick={() => setIsEditMode(false)}
                    fullWidth
                    shape="rounded"
                    className="py-3"
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
                    className="py-3 font-bold"
                  />
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <ButtonBase
                      label="Logout"
                      variant="danger"
                      eventClick={handleLogout}
                      fullWidth
                      shape="rounded"
                      className="py-3 font-bold border-2"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
