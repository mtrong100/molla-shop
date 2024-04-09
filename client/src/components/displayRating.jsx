import React from "react";
import { FaStar } from "react-icons/fa6";

export const displayRating = (value) => {
  if (!value) return;

  switch (value) {
    case "1":
      return <FaStar />;
    case "2":
      return (
        <>
          <FaStar />
          <FaStar />
        </>
      );
    case "3":
      return (
        <>
          <FaStar />
          <FaStar />
          <FaStar />
        </>
      );
    case "4":
      return (
        <>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </>
      );
    case "5":
      return (
        <>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </>
      );
    default:
      return null;
  }
};
