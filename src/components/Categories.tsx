import { useWhyDidYouUpdate } from "ahooks";
import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    const categories: string[] = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeCategory(index)}
                className={value === index ? "active" : ""}
              >
                {categoryName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
