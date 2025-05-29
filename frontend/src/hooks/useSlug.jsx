
export function useSlug(){
    const slugify = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar tildes
    .replace(/\s+/g, "-")            // espacios a guiones
    .replace(/[^\w-]/g, "");         // quitar símbolos raros

    return {slugify}
} 
