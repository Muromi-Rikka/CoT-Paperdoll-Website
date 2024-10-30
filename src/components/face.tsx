import { useRequest } from "ahooks";
import { Segmented } from "antd";
import { useMemo, useState } from "react";
import { ImageCard } from "./ImageCard.tsx";

const BodyOptions = [
  { label: "区分标记", value: "distinguishing_marks" },
  { label: "其他", value: "face_other" },
];

interface IFace {
  distinguishing_marks: IFaceItem[];
  face_other: IFaceItem[];
}

interface IFaceItem {
  key: string;
  name: string;
  path: string;
}

export function FaceView() {
  const { data } = useRequest(
    () => fetch("/resources-face.json").then(res => res.json() as Promise<IFace>),
    {
      cacheKey: "resources-face",
      debounceWait: 300,
      refreshOnWindowFocus: true,
    },
  );
  const [selectFace, setSelectFace] = useState<string>("");
  const paths = useMemo(() => {
    if (data && selectFace) {
      return data[selectFace as keyof IFace];
    }
    return [];
  }, [selectFace, data]);
  return (
    <div>
      <div className="my-4">
        <Segmented
          options={BodyOptions}
          value={selectFace}
          onChange={value => setSelectFace(value)}
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
