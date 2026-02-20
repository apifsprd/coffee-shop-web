import React from "react";
import { Text } from "../Text";
import { Loader } from "lucide-react";

export default function SpinnerLoading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Loader className="animate-spin " size={20} />
      <Text variant="p">Please wait...</Text>
    </div>
  );
}
