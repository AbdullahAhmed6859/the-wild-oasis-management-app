import supabase, { supabaseUrl } from "./supabase";
const defaultImageName = "default.jpg";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data: cabinData, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();
  console.log(cabinData);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  // const image = cabinData.image.replace(
  //   "https://grsippozsesugdalgnst.supabase.co/storage/v1/object/public/cabin-images/"
  // );

  // await supabase.storage.from("cabin-images").remove([image]);

  return cabinData;
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imageName = cabin?.image?.name
    ? `${Math.random()}-${cabin.image.name.replace(/\//g, "")}`
    : defaultImageName;

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  query = id
    ? query
        .update({ ...cabin, image: hasImagePath ? cabin.image : imagePath })
        .eq("id", id)
    : query.insert([{ ...cabin, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath || !cabin?.image?.name) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}
