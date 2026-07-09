import React from "react";

import { Box } from "@/ui";

import {
  contentClass,
  priceClass,
  footerClass,
  hintClass,
  imageClass,
  imageHolderClass,
  nameClass,
  ratingClass,
  rowClass,
  tagClass,
  tagsClass,
} from "./Hotel.css";

import type { TProps } from "./Hotel.types";

const Hotel: React.FC<TProps> = ({
  city,
  name,
  nightlyUsd,
  nightsTotal,
  rating,
  tags,
  thumbnailUrl,
  type,
}) => (
  <Box
    footer={
      <div className={footerClass}>
        <p className={hintClass}>
          ${nightlyUsd} / night &times; {nightsTotal}
        </p>

        <p className={priceClass}>${nightlyUsd * nightsTotal}</p>
      </div>
    }
    title="Stay"
  >
    <div className={rowClass}>
      <div className={imageHolderClass}>
        <img
          alt={name}
          className={imageClass}
          src={thumbnailUrl}
        />
      </div>

      <div className={contentClass}>
        <div className={rowClass}>
          <p className={nameClass}>{name}</p>
          <p className={ratingClass}>&#9733; {rating}</p>
        </div>

        <p className={hintClass}>
          {city} <strong>·</strong> {type}
        </p>

        <ul className={tagsClass}>
          {tags.map<React.ReactElement>((tag: string) => (
            <li
              className={tagClass}
              key={`hotel-tag-item-${tag}`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Box>
);

export { Hotel };
