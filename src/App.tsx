import { Segmented } from "antd";
import cx from "classix";
import { useState } from "react";
import { BodyView } from "./components/body.tsx";
import { ClothesView } from "./components/clothes.tsx";
import { FaceView } from "./components/face.tsx";
import { HairView } from "./components/hair.tsx";
import "./App.css";

function SegmentedOption(props: { icon: string;label: string }) {
  const { icon, label } = props;
  return (
    <div className="p-2">
      <span className={cx("text-xl", icon)}></span>
      <div className="text-gray-800">{label}</div>
    </div>
  );
}

function App() {
  const ClassOptions = [
    { label: (<SegmentedOption icon="icon-[healthicons--body-outline]" label="身体" />), value: "body" },
    { label: (<SegmentedOption icon="icon-[mingcute--hair-line]" label="头发" />), value: "hair" },
    { label: (<SegmentedOption icon="icon-[icon-park-outline--worried-face]" label="面部" />), value: "face" },
    { label: (<SegmentedOption icon="icon-[icon-park-outline--clothes-suit]" label="服饰" />), value: "clothes" },
  ];

  const [selectClass, setSelectClass] = useState("hair");

  return (
    <div className="p-4">
      <Segmented
        options={ClassOptions}
        value={selectClass}
        onChange={value => setSelectClass(value)}
      />
      {selectClass === "hair" && <HairView></HairView>}
      {selectClass === "body" && <BodyView></BodyView>}
      {selectClass === "face" && <FaceView></FaceView>}
      {selectClass === "clothes" && <ClothesView></ClothesView>}
    </div>
  );
}

export default App;
