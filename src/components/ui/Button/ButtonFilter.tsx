import React from "react";
import ButtonBase from "./ButtonBase";

function ButtonFilter({ items }: { items: string[] }) {
  return (
    <div className="w-full overflow-scroll flex flex-row gap-2 no-scrollbar">
      {items.map((item, index) => (
        <ButtonBase
          key={index}
          label="category"
          type="button"
          variant="outline-inactive"
          size="md"
        />
      ))}
    </div>
  );
}

export default ButtonFilter;
