import { useState } from "react"

// 🔹 親コンポーネント（App）から受け取る Props の型
// OnSearch は「入力された文字列を親に送るための関数」
type SearchBarProps = {
  OnSearch: (inputValue: string) => void;
};

export default function SearchBar({ OnSearch }: SearchBarProps) {

  // 🔹 SearchBar 内で入力欄の文字を管理する state
  // inputValue = 現在の入力内容
  // setInputValue = 入力が変わるたびに値を更新する関数
  const [inputValue, setInputValue] = useState("");

  // 🔹 input が変更された時に呼ばれる関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const newValue = e.target.value;  // 入力された新しい文字

    setInputValue(newValue);          // SearchBar 内の state を更新

    OnSearch(newValue);               // 親コンポーネント（App）へ新しい文字を渡す
  };

  return (
    <div className="searchbar">
      <input
        onChange={handleChange}       // 🔹 文字入力があると handleChange が実行される
        type="text"
        placeholder="Put Id or Name"
        value={inputValue}            // 🔹 input の表示内容を state と同期させる（Controlled Component）
      />
    </div>
  );
}
