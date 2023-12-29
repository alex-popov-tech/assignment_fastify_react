import { useState } from "react";
import { mutate } from "swr";
import { IBicycle } from "./types";

const createBicycle = async (bicycle: Omit<IBicycle, "status">) => {
  const res = await fetch("/api/bicycle", {
    body: JSON.stringify(bicycle),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  const result = await res.json();
  if (res.status !== 200) {
    throw new Error(result.message);
  } else {
    mutate("/api/bicycle");
  }
};

function Input({
  required,
  type,
  placeholder,
  value,
  setValue,
}: {
  required?: boolean;
  type: "text" | "number";
  placeholder: string;
  value: string | null;
  setValue: (value: string) => void;
}) {
  const borderColor =
    value === null || !required
      ? ""
      : value.length > 0
        ? "border-[#6FCF97]"
        : "border-[#EB5757]";
  return (
    <input
      required={required}
      className={`p-4 rounded-md border-2 outline-none ${borderColor} bg-[#E8E8E8] placeholder:text-[#717171]`}
      onChange={(e) => setValue(e.target.value)}
      value={value ?? ""}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}

function Textarea(props: {
  placeholder: string;
  value: string | null;
  setDescription: (value: string) => void;
}) {
  return (
    <textarea
      value={props.value ?? ""}
      onChange={(e) => props.setDescription(e.target.value)}
      placeholder={props.placeholder}
      className="p-4 resize-none rounded-md text-[#717171] bg-[#E8E8E8] col-span-2 row-span-2"
    />
  );
}

export function AddBicycleForm() {
  const [name, setName] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [wheelSize, setWheelSize] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const clear = () => {
    setName(null);
    setType(null);
    setColor(null);
    setWheelSize(null);
    setPrice(null);
    setId(null);
    setDescription(null);
  };

  return (
    <form
      className="grid grid-cols-2 grid-rows-[repeat(6,2.25rem)] gap-4 h-fit"
      onSubmit={async (e) => {
        e.preventDefault();
        await createBicycle({
          name: name!,
          type: type!,
          color: color!,
          wheelSize: Number(wheelSize!),
          price: Number(price!),
          id: id ?? "",
          description: description ?? "",
        }).then(
          () => clear(),
          (err) => console.error(err),
        );
      }}
    >
      <Input
        required
        type="text"
        placeholder="Name"
        value={name}
        setValue={setName}
      />
      <Input
        required
        type="text"
        placeholder="Type"
        value={type}
        setValue={setType}
      />
      <Input
        required
        type="text"
        placeholder="Color"
        value={color}
        setValue={setColor}
      />
      <Input
        required
        type="number"
        placeholder="Wheel size"
        value={wheelSize}
        setValue={setWheelSize}
      />
      <Input
        required
        type="number"
        placeholder="Price"
        value={price}
        setValue={setPrice}
      />
      <Input
        type="text"
        placeholder="ID ( slug ): XXXXXXXXXXXXXX"
        value={id}
        setValue={setId}
      />
      <Textarea
        placeholder="Description"
        value={description}
        setDescription={setDescription}
      />
      <button type="submit" className="bg-[#696969] text-[#E8E8E8] rounded-md">
        SAVE
      </button>
      <button
        onClick={clear}
        className="bg-[#696969] text-[#E8E8E8] rounded-md"
      >
        CLEAR
      </button>
    </form>
  );
}
