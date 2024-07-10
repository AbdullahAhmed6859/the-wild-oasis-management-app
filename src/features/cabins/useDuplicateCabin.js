import useCreateCabin from "./useCreateCabin";

export default function useDuplicateCabin() {
  const { isCreating, createCabin } = useCreateCabin("Duplicated");

  function duplicateCabin(cabin) {
    const { name, maxCapacity, regularPrice, discount, image, description } =
      cabin;
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return { isDuplicating: isCreating, duplicateCabin };
}
