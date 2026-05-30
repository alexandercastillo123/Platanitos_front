import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  image: string; // URL de la imagen
  isTop?: boolean;
  href?: string;
}

const categories: Category[] = [
  { id: "deportivas", label: "Deportivas", image: "/img/imgcirculares/deportivas.webp" },
  { id: "sandalias",  label: "Sandalias",  image: "/img/imgcirculares/sandalias.webp",  isTop: true },
  { id: "urbanas",    label: "Urbanas",    image: "/img/imgcirculares/urbanas.webp",    isTop: true },
  { id: "botas",      label: "Botas",      image: "/img/imgcirculares/botas.webp" },
  { id: "estiletos",  label: "Estiletos",  image: "/img/imgcirculares/estiletos.webp" },
  { id: "con-taco",   label: "Con Taco",   image: "/img/imgcirculares/contaco.webp" },
  { id: "de-moda",    label: "De Moda",    image: "/img/imgcirculares/demoda.webp",    isTop: true },
  { id: "carteras",   label: "Carteras",   image: "/img/imgcirculares/carteras.webp" },
];

interface CategoryCircleProps {
  category: Category;
  onClick?: (id: string) => void;
}

function CategoryCircle({ category, onClick }: CategoryCircleProps) {
  return (
    <button
      onClick={() => onClick?.(category.id)}
      className="flex flex-col items-center gap-2 group focus:outline-none"
    >
      {/* Círculo */}
      <div className="relative">
        <div
          className={cn(
            "w-[76px] h-[76px] rounded-full overflow-hidden",
            "border-2 border-gray-200",
            "transition-transform duration-200",
            "group-hover:scale-105 group-hover:border-green-500",
            "group-focus-visible:ring-2 group-focus-visible:ring-green-500 group-focus-visible:ring-offset-2"
          )}
        >
          <img
            src={category.image}
            alt={category.label}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Badge TOP */}
        {category.isTop && (
          <span
            className={cn(
              "absolute -top-1 -right-1 z-10",
              "bg-green-500 text-white",
              "text-[9px] font-extrabold tracking-wide",
              "px-1.5 py-0.5 rounded"
            )}
          >
            TOP
          </span>
        )}
      </div>

      {/* Label */}
      <span className="text-xs font-bold text-gray-800 text-center leading-tight">
        {category.label}
      </span>
    </button>
  );
}

interface CategoryCirclesProps {
  title?: string;
  subtitle?: string;
  items?: Category[];
  onSelect?: (id: string) => void;
  className?: string;
}

export default function CategoryCircles({
  title = "Lo más Top 😎",
  subtitle = "¡Aprovecha lo más buscado!",
  items = categories,
  onSelect,
  className,
}: CategoryCirclesProps) {
  return (
    <section className={cn("py-4 px-4", className)}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[18px] font-extrabold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>

      {/* Grid de círculos */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((cat) => (
          <CategoryCircle
            key={cat.id}
            category={cat}
            onClick={onSelect}
          />
        ))}
      </div>
    </section>
  );
}


export type { Category };
