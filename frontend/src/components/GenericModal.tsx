import { useState, useEffect } from "react";

interface Item {
  id: string;
  name: string;
}
interface ModalProps {
  items: Item[];
  onClose: () => void;
  onModalClose: (selectedItems: Item[]) => void;
}

const GenericModal: React.FC<ModalProps> = ({
  items,
  onClose,
  onModalClose,
}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const handleCloseModal = () => {
    onModalClose(selectedItems);
    onClose();
  };

  const handleClick = (item: Item) => {
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    onModalClose(selectedItems);
  }, [selectedItems, onModalClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="rounded-lg bg-white p-8">
        <h2 className="mb-4 text-xl">Choose 2 items:</h2>
        <div className="flex flex-wrap">
          {items.map((item) => (
            <button
              key={item.id}
              className={`m-1 rounded p-2 ${
                selectedItems.some(
                  (selectedItem) => selectedItem.id === item.id
                )
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handleClick(item)}
              disabled={
                selectedItems.length === 2 &&
                !selectedItems.some(
                  (selectedItem) => selectedItem.id === item.id
                )
              }
            >
              {item.name}
            </button>
          ))}
        </div>
        {selectedItems.length === 2 && (
          <p className="mt-4 text-red-500">Only 2 items can be chosen.</p>
        )}
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GenericModal;
