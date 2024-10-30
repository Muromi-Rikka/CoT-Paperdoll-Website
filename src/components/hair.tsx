import { useRequest } from "ahooks";
import { Select } from "antd";
import { useMemo, useState } from "react";
import { ImageCard } from "./ImageCard.tsx";

interface IHair {
  key: string;
  name: string;
  paths: IHairPath[];
}

interface IHairPath {
  key: string;
  name: string;
  path: string;
}

export function HairView() {
  const { data } = useRequest(
    () => fetch("/resources-hair.json").then(res => res.json() as Promise<IHair[]>),
    {
      cacheKey: "resources-hair",
      debounceWait: 300,
      refreshOnWindowFocus: true,
    },
  );
  const HairOptions = useMemo(() => {
    if (data) {
      return data.map(item => ({
        value: item.key,
        label: item.name,

      }));
    }
    return [];
  }, [data]);

  const [selectHair, setSelectHair] = useState<string>();
  const paths = useMemo(() => {
    if (data && selectHair) {
      const finded = data.find(item => item.key === selectHair);
      if (finded) {
        return finded.paths;
      }
    }
    return [];
  }, [selectHair, data]);
  return (
    <div>
      <div className="my-4">
        <Select
          options={HairOptions}
          style={{ minWidth: 180 }}
          value={selectHair}
          onChange={value => setSelectHair(value)}
        >
        </Select>
      </div>
      <div className="flex flex-row justify-start items-start flex-wrap">
        {paths.map(path => (
          <ImageCard key={path.key} name={path.name} path={path.path}></ImageCard>
        ))}
      </div>
    </div>
  );
}
