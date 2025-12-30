import React from "react";
import { ButtonIcon } from "../Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationBaseProps {
  currentPage: number;
  totalPages: number;
  eventNext: () => void;
  eventPrev: () => void;
}

function PaginationBase({
  currentPage,
  totalPages,
  eventNext,
  eventPrev,
}: PaginationBaseProps) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <ButtonIcon
        icon={<ArrowLeft size={20} />}
        iconOnly
        eventClick={() => eventNext}
        variant={currentPage === 1 ? "outline" : "primary"}
      />
      <div>
        <p className="text-base">
          {currentPage} / {totalPages}
        </p>
      </div>
      <ButtonIcon
        icon={<ArrowRight size={20} />}
        iconOnly
        eventClick={() => eventPrev}
        variant={currentPage === totalPages ? "outline" : "primary"}
      />
    </div>
  );
}

export default PaginationBase;
