import { useState } from "react";
import { createBicycle } from "@/api";
import { Input } from "./input";
import { Textarea } from "./textarea";

export function AddBicycleForm() {
  const [name, setName] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [wheelSize, setWheelSize] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const clear = () => {
    setName(null);
    setType(null);
    setColor(null);
    setWheelSize(null);
    setPrice(null);
    setId(null);
    setDescription(null);
  };
  const onSubmitHandler = async (e) => {
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
      (error) => {
        setErrors(
          JSON.parse(error.message).map(
            (it) => `Error in "${it.path}" - ${it.message}`,
          ),
        );
      },
    );
  };

  return (
    <form
      className="grid grid-cols-2 grid-rows-[repeat(5,2.25rem),auto,2.25rem] gap-4 h-fit"
      onSubmit={onSubmitHandler}
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
      <div className="col-span-2 h-fit">
        {errors.map((it) => (
          <label key={it} className="block text-error">
            {it}
          </label>
        ))}
      </div>
      <button type="submit" className="bg-darkgrey text-white rounded-md">
        SAVE
      </button>
      <button onClick={clear} className="bg-darkgrey text-white rounded-md">
        CLEAR
      </button>
    </form>
  );
}
