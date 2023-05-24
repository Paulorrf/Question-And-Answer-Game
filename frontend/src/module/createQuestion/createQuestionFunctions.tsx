import React from "react";

interface DifficultyProp {
  name: string;
  brName: string;
}

export function DifficultyOption(
  name: string,
  brName: string,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
) {
  return (
    <li key={name} className="child:cursor-pointer child:p-2">
      <label
        htmlFor={name}
        className={difficulty === name ? " rounded border border-white" : ""}
      >
        {brName}
      </label>
      <input
        className="hidden"
        type="checkbox"
        id={name}
        name={name}
        onClick={() => setDifficulty(name)}
      />
    </li>
  );
}
