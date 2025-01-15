"use client";

import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { useDebounceEffect } from "ahooks";
import { canvasPreview } from "./canvas";

import { clsx } from "clsx";
import Image from "next/image";
import { Icon } from "@iconify/react";

import JsBarcode from "jsbarcode";
// import html2canvas from "html2canvas";

function generate12DigitString(): string {
  const timestamp = Date.now(); // 获取当前时间戳（13 位）
  const timestampStr = timestamp.toString(); // 转换为字符串
  return timestampStr.slice(-12); // 截取后 12 位
}

const CatReceiptGenerator = () => {
  const [src, setSrc] = useState(""); // 上传的猫图片
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  // const downloadRef = useRef<HTMLAnchorElement>(null);
  const barcodeRef = useRef(null);
  const recipeRef = useRef(null);
  const [crop, setCrop] = useState<Crop>(); // 裁剪区域
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const [progressMap, setProgressMap] = useState(0b1);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const aspect = 1;

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  useDebounceEffect(
    () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0
        );
      }
    },
    [completedCrop],
    { leading: false, wait: 100 }
  );

  React.useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, generate12DigitString(), {
        textMargin: 0,
        fontOptions: "bold",
      });
    }
  }, [progressMap]);

  function Step(props: {
    index: number;
    title: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }) {
    return (
      <div
        className="flex flex-col justify-center items-center min-w-[7rem]"
        onClick={props.onClick}
      >
        <div
          className={clsx(
            "w-[4rem] h-[4rem] bg-violet-400 text-center rounded-full font-mono relative",
            {
              "ring-2 ring-violet-500 ring-offset-2":
                (progressMap & (1 << props.index)) > 0,
            }
          )}
        >
          <div className="absolute text-[2rem] left-[1.4rem] top-[0.5rem]">
            {props.index + 1}
          </div>
        </div>
        <h1>{props.title}</h1>
      </div>
    );
  }

  // function handleScreenShot() {
  //   if (recipeRef.current) {
  //     // 使用 html2canvas 截取元素
  //     html2canvas(recipeRef.current).then((canvas) => {
  //       // 将 canvas 转换为图片 URL
  //       const imageUrl = canvas.toDataURL("image/png");

  //       // 创建一个链接元素
  //       const link = downloadRef.current;
  //       if (!link) {
  //         return;
  //       }
  //       link.href = imageUrl;
  //       link.download = "screenshot.png"; // 设置下载文件名
  //       link.click(); // 触发下载
  //     });
  //   }
  // }

  return (
    <div>
      <div className="flex flex-row gap-x-4 justify-between my-8 mx-2">
        <Step
          index={0}
          title="Choose"
          onClick={() => {
            setProgressMap(0b001);
          }}
        />
        <Step
          index={1}
          title="Confirm"
          onClick={() => {
            setProgressMap(0b010);
          }}
        />
        <Step
          index={2}
          title="Share"
          onClick={() => {
            setProgressMap(0b100);
          }}
        />
      </div>
      <section
        id="step1_file"
        className={clsx({ hidden: progressMap !== 0b001 }, "mx-auto")}
      >
        <div className="flex justify-center">
          <div className="p-1 border-2 rounded-lg group flex flex-row items-center ">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onSelectFile}
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-block px-2 group-hover:cursor-pointer "
            >
              upload your pet&apos;s photo
            </label>
            <Icon
              icon="material-symbols:upload"
              width="24"
              height="24"
              className="inline-block group-hover:cursor-pointer"
            />
          </div>
        </div>
        {!!src && (
          <div className="flex flex-col items-center mx-4 ">
            <div className="flex flex-row items-center justify-between w-full mx-2">
              <div>
                {/* <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 text-center"
                >
                  Name
                </label> */}
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mx-auto mt-1 block w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="input pet's name"
                />
              </div>

              <div>
                {/* <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 text-center"
                >
                  Age
                </label> */}
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mx-auto mt-1 block w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="input pet's age"
                />
              </div>
            </div>
            <div className="mt-2">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                minHeight={100}
                circularCrop={true}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={src}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>
            <button
              id="confirm"
              onClick={() => {
                setProgressMap(0b010);
              }}
              className="rounded-lg px-2 py-2 border w-full mx-2 bg-violet-200 hover:bg-violet-500"
            >
              Confirm
            </button>
          </div>
        )}
      </section>
      <section
        id="step2_confirm_and_save"
        className={clsx(
          { hidden: progressMap !== 0b010 },
          " relative",
          "max-w-md mx-auto flex flex-col"
        )}
        style={{
          fontFamily: "Courier, monospace, helvetica, sans-serif",
        }}
      >
        {/* <a className="hidden" ref={downloadRef}>
          download
        </a>
        <button
          className="border rounded-lg mt-4 mx-auto"
          onClick={handleScreenShot}
        >
          Save
        </button> */}
        <section
          className="text-pretty text-base mx-2 border-2 border-t-0 border-l-0 p-2 shadow-xl mb-8 "
          id="text"
          ref={recipeRef}
        >
          <Image
            src="/XiaohongshuLOGO.svg"
            alt="xiaohongshulogo"
            width={200}
            height={200}
            className="rounded-full mx-auto"
          />
          <p className="text-center font-bold">Cat Tax Payment Confirmation</p>
          <p>This certifies that:</p>
          <p>
            The submitted pet photo has been accepted, and this account is now
            authorized to continue activities on this platform.
          </p>
          <p>
            Please note that regular <strong>CAT TAX</strong> payments help
            maintain a positive community atmosphere.
          </p>
          <hr className="custom-dashed-hr "></hr>
          <div className="flex justify-center my-1">
            {!!completedCrop && (
              <div>
                <canvas
                  ref={previewCanvasRef}
                  className="mx-auto"
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    // width: completedCrop.width,
                    // height: completedCrop.height,
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "100%",
                  }}
                />
              </div>
            )}
            <ul className="ml-2 my-auto">
              <li>
                <strong>Name: </strong> {name}
              </li>
              <li>
                <strong>Age: </strong> {age}
              </li>
            </ul>
          </div>
          <hr className="custom-dashed-hr "></hr>
          <p className="text-lg">
            <div>
              <strong>Collector: </strong>Xiaohongshu Community
            </div>
            <div>
              <strong>Date: </strong>
              {new Date().toLocaleString()}
            </div>
            <div>
              <strong>Confirmation Seal: </strong>
              <span className="text-xl absolute">🍠🐾</span>
            </div>
          </p>
          <svg ref={barcodeRef} className="mx-auto" />
          <p className="text-center text-sm bg-black text-white">
            Generated By cat-tax.xyz
          </p>
        </section>
      </section>
      <section
        id="step3_share"
        className={clsx(
          { hidden: progressMap !== 0b100 },
          "mx-2 flex flex-col text-2xl justify-center text-center"
        )}
      >
        <div> Share your Certifies to</div>
        <strong className="block p-4 text-4xl"> Xiaohongshu</strong>
        <a href="xhsdiscover://">
          <Image
            src="/XiaohongshuBigLOGO.svg"
            alt="xiaohongshaBigulogo"
            width={200}
            height={200}
            className="mt-4 mx-auto "
          />
        </a>
      </section>
    </div>
  );
};

export default CatReceiptGenerator;
