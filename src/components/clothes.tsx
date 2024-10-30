import { useRequest } from "ahooks";
import { Segmented, Select } from "antd";
import { useMemo, useState } from "react";
import { ImageCard } from "./ImageCard.tsx";

const BodyOptions = [
  { label: "上衣", value: "tops" },
  { label: "连衣裙", value: "dresses" },
  { label: "紧身衣", value: "bodysuits" },
  { label: "下装", value: "bottoms" },
  { label: "外套", value: "outerwear" },
  { label: "内衣", value: "underwear" },
  { label: "鞋类", value: "footwear" },
  { label: "泳装", value: "swimwear" },
  { label: "配饰", value: "accessories" },
  { label: "包包", value: "bags" },
  { label: "其他", value: "other" },
  { label: "口罩", value: "masks" },
];

interface IClothes {
  tops: IClothesItem[];
  dresses: IClothesItem[];
  bodysuits: IClothesItem[];
  bottoms: IClothesItem[];
  outerwear: IClothesItem[];
  underwear: IClothesItem[];
  footwear: IClothesItem[];
  swimwear: IClothesItem[];
  accessories: IClothesItem[];
  bags: IClothesItem[];
  other: IClothesItem[];
  masks: IClothesItem[];
}

interface IClothesItem {
  key: string;
  name: string;
  paths: IClothesItemPath[];
}
interface IClothesItemPath {
  key: string;
  name: string;
  path: string;
}

export function ClothesView() {
  const { data } = useRequest(
    () => fetch("/resources-clothes.json").then(res => res.json() as Promise<IClothes>),
    {
      cacheKey: "resources-clothes",
      debounceWait: 300,
      refreshOnWindowFocus: true,
    },
  );
  const [selectClothesCategory, setSelectClothesCategory] = useState<string>("");
  const ClothesOptions = useMemo(() => {
    if (data && selectClothesCategory) {
      return data[selectClothesCategory as keyof IClothes].map(item => ({
        label: `[${item.paths.length.toString().padStart(2, "0")}]${item.name}(${item.key})`,
        value: item.key,
      }));
    }
    return [];
  }, [data, selectClothesCategory]);
  const [selectClothes, setSelectClothes] = useState<string>("");
  const paths = useMemo(() => {
    if (data && selectClothes && selectClothesCategory) {
      const finded = data[selectClothesCategory as keyof IClothes].find(item => item.key = selectClothes);
      if (finded) {
        return finded.paths;
      }
    }
    return [];
  }, [data, selectClothesCategory, selectClothes]);
  return (
    <div>
      <div className="my-4">
        <Segmented
          options={BodyOptions}
          value={selectClothesCategory}
          onChange={(value) => {
            setSelectClothes("");
            setSelectClothesCategory(value);
          }}
        />
      </div>
      <div className="my-4">
        <Select
          options={ClothesOptions}
          value={selectClothes}
          style={{ minWidth: 180 }}
          onChange={value => setSelectClothes(value)}
        />
      </div>
      <div className="flex flex-row justify-start items-start flex-wrap">
        {paths.map(path => (
          <ImageCard key={path.key} name={path.name} path={path.path}></ImageCard>
        ))}
      </div>
    </div>
  );
}
