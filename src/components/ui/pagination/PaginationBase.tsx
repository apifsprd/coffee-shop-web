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
        eventClick={eventPrev}
        variant={currentPage === 1 ? "outline" : "primary"}
        isDisabled={currentPage === 1}
      />
      <div>
        <p className="text-base">
          {currentPage} / {totalPages}
        </p>
      </div>
      <ButtonIcon
        icon={<ArrowRight size={20} />}
        iconOnly
        eventClick={eventNext}
        variant={currentPage === totalPages ? "outline" : "primary"}
        isDisabled={currentPage === totalPages}
      />
    </div>
  );
}

export default PaginationBase;
