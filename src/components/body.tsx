import { useRequest } from "ahooks";
import { Segmented } from "antd";
import { useMemo, useState } from "react";
import { ImageCard } from "./ImageCard.tsx";

const BodyOptions = [
  { label: "基础", value: "base" },
  { label: "阴茎", value: "penis" },
  { label: "胸部", value: "breasts" },
];

interface IBody {
  breasts: IBodyItem[];
  penis: IBodyItem[];
  base: IBodyItem[];
}

interface IBodyItem {
  key: string;
  name: string;
  path: string;
}

export function BodyView() {
  const { data } = useRequest(
    () => fetch("/resources-body.json").then(res => res.json() as Promise<IBody>),
    {
      cacheKey: "resources-body",
      debounceWait: 300,
      refreshOnWindowFocus: true,
    },
  );
  const [selectBody, setSelectBody] = useState<string>("");
  const paths = useMemo(() => {
    if (data && selectBody) {
      return data[selectBody as keyof IBody];
    }
    return [];
  }, [selectBody, data]);
  return (
    <div>
      <div className="my-4">
        <Segmented
          options={BodyOptions}
          value={selectBody}
          onChange={value => setSelectBody(value)}
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
