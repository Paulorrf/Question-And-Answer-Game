import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import useStore from "../store/store";
import axios from "@/axios";
import { BsArrowRightSquareFill } from "react-icons/bs";
import questionQuantityStore from "@/store/questionsQuantityStore";
import tagsStore from "@/store/tagsStore";
import nextBtnStore from "@/store/nextBtnStore";
import setQuestionStore from "@/store/setQuestionStore";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Checkbox, Grid, TextInput } from "@mantine/core";

interface DifficultyProp {
  name: string;
  brName: string;
}

interface DifficultyProp {
  name: string;
  brName: string;
}

function difficultyOption(
  name: string,
  brName: string,
  changeDifficulty: (difficulty: string) => void,
  difficulty: string
) {
  return (
    <li
      key={name}
      className={`${
        difficulty === name ? "bg-white text-black" : ""
      } cursor-pointer rounded border border-white px-4 py-2 font-bold child:cursor-pointer child:p-2`}
      onClick={() => changeDifficulty(name)}
    >
      {brName}
    </li>
  );
}

//@ts-ignore
const QuestionOptions = ({
  setProximo,
}: {
  setProximo: Dispatch<SetStateAction<number>>;
}) => {
  const [genericTags, setGenericTags] = useState<Array<string>>([]);
  const [specificTags, setSpecificTags] = useState<Array<string>>([]);
  const [recSpec, setRecSpec] = useState([]);
  const [error, setError] = useState(false);
  const [errorTagExist, setErrorTagExist] = useState(false);

  const [allGenericTags, setAllGenericTags] = useState([]);
  const [allSpecTags, setAllSpecTags] = useState<string[]>([]);

  const quantityOptions = [5, 10, 15, 20];

  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRefDesc = useRef<HTMLInputElement>(null);
  const inputRefTitle = useRef<HTMLInputElement>(null);

  //zustand values
  const difficulty = useStore((state) => state.difficulty);
  const quantity = questionQuantityStore((state) => state.quantity);
  const tagsGeneric = tagsStore((state) => state.genericTags);
  const tagsSpec = tagsStore((state) => state.specificTags);
  const newTags = tagsStore((state) => state.newTags);
  const storedRecommendedSpec = tagsStore(
    (state) => state.storedRecommendedSpec
  );
  const setQuestion = setQuestionStore((state) => state.question_set);

  //zustand functions
  const changeDifficulty = useStore((state) => state.changeDifficulty);
  const changeQuantity = questionQuantityStore((state) => state.changeQuantity);
  const changeGenericArr = tagsStore((state) => state.changeGenericArr);
  const changeTagsSpec = tagsStore((state) => state.changeSpecific);
  const changeSpecificArr = tagsStore((state) => state.changeSpecificArr);
  const addNewTag = tagsStore((state) => state.addNewTag);
  const addStoredRecommendedSpecOne = tagsStore(
    (state) => state.addStoredRecommendedSpecOne
  );
  const addStoredRecommendedSpecArr = tagsStore(
    (state) => state.addStoredRecommendedSpecArr
  );
  const changeQuestionSet = setQuestionStore(
    (state) => state.changeQuestionSet
  );

  const isActionEnabled = nextBtnStore((state) => state.isActionEnabled);
  const performAction = nextBtnStore((state) => state.performAction);

  const [opened, { open, close }] = useDisclosure(false);
  const [openSpecModal, setOpenSpecModal] = useState(false);

  console.log("dificuldade");
  console.log(tagsGeneric);
  console.log("dificuldade");

  const difficulties = [
    { name: "easy", brName: "Fácil" },
    { name: "normal", brName: "Normal" },
    { name: "hard", brName: "Díficil" },
    { name: "very_hard", brName: "Muito Díficil" },
    // { name: "expert", brName: "Expert" },
  ];

  useEffect(() => {
    if (genericTags.length === 0) {
      setSpecificTags([]);
    }
  }, [genericTags]);

  useEffect(() => {
    setErrorTagExist(false);
  }, [tagsSpec]);

  useEffect(() => {
    if (isActionEnabled) {
      performAction(genericTags, specificTags);
    }
    // eslint-disable-next-line
  }, [isActionEnabled, performAction]);

  useEffect(() => {
    if (tagsGeneric.length > 0 && tagsSpec.length > 0) {
      setGenericTags(tagsGeneric);
      setSpecificTags(tagsSpec);
    }
  }, [genericTags, specificTags]);

  useEffect(() => {
    async function getData() {
      const genericPortals = await axios.get(`portal/generic`);
      setAllGenericTags(genericPortals.data);
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      if (
        tagsGeneric.length > 0 &&
        !(allSpecTags.length < storedRecommendedSpec.length)
      ) {
        const allGenericTags = [tagsGeneric[0], tagsGeneric[1]];
        const specificPortals: { data: { id: number; name: string }[] } =
          await axios.get(`portal/specific/${allGenericTags.join(",")}`);

        const specificPortalsNames = specificPortals.data.map(
          (portal) => portal.name
        );

        setAllSpecTags(specificPortalsNames);
        addStoredRecommendedSpecArr(specificPortalsNames);
      }
    }

    getData();
  }, [tagsGeneric]);

  const handleTitleInput = () => {
    if (inputRefTitle.current?.value !== null) {
      changeQuestionSet({
        title: inputRefTitle.current?.value!,
        description: inputRefDesc.current?.value ?? "",
      });
    }
  };

  const handleDescInput = () => {
    if (inputRefDesc.current?.value !== null) {
      changeQuestionSet({
        title: inputRefTitle.current?.value! ?? "",
        description: inputRefDesc.current?.value!,
      });
    }
  };

  async function handleSpecificChange(
    event: React.FormEvent<HTMLInputElement>
  ) {
    if (event.currentTarget.value !== "" && tagsGeneric.length > 0) {
      const words = tagsGeneric.join();
      console.log(words);

      const returnedValues = await axios.get(
        `portal/sletter/${event.currentTarget.value}/${words}`
      );
      console.log(returnedValues.data);
      setRecSpec(returnedValues.data);
    } else {
      setRecSpec([]);
    }
  }

  function addSpecificTag(name: string) {
    console.log(name);
    setRecSpec([]);
    changeTagsSpec(name);
    setSpecificTags((prev) => [...prev, name]);
    if (inputRef2.current) {
      inputRef2.current.value = "";
      inputRef2.current.focus();
    }
  }

  function closeSpecModal() {
    setOpenSpecModal(false);
    setRecSpec([]);
  }

  const compareArrays = (a: string[], b: string[]) =>
    a.length === b.length && a.every((element, index) => element === b[index]);

  function handleAddSpecific(event: React.SyntheticEvent) {
    event.preventDefault();

    if (compareArrays(storedRecommendedSpec, newTags)) {
      setErrorTagExist(true);
    }

    if (
      inputRef2.current !== null &&
      inputRef2.current.value !== null &&
      !compareArrays(storedRecommendedSpec, newTags)
    ) {
      setErrorTagExist(false);
      let value = inputRef2.current.value;
      addStoredRecommendedSpecOne(value);
      addNewTag(value);
      changeTagsSpec(value);
      setAllSpecTags((prev) => [...prev, value]);
      setSpecificTags((prev) => [...prev, value]);
      inputRef2.current.value = "";
    }
  }

  function handleProximo() {
    if (
      quantity > 0 &&
      tagsGeneric.length > 0 &&
      tagsSpec.length > 0 &&
      setQuestion.description !== "" &&
      setQuestion.title !== ""
    ) {
      setProximo((prev: number) => prev + 1);
    } else {
      setError(true);
    }
  }

  console.log(tagsSpec);
  console.log(allSpecTags);
  console.log(inputRef2?.current?.value);
  // console.log(idxGen);

  return (
    <div>
      <div className="mb-16">
        {error && (
          <p className="text-2xl text-red-600 underline">
            Por favor preencha todos os campos
          </p>
        )}
        <h3 className="mb-4 font-bold">
          {"Escolha a quantidade de questões".toUpperCase()}
        </h3>
        <ul className="flex justify-between">
          {quantityOptions.map((questionNr: number) => {
            return (
              <li
                key={questionNr}
                className={`${
                  questionNr === quantity ? "bg-white text-black" : ""
                } cursor-pointer rounded border border-white px-4 py-2 font-bold`}
                // onClick={() => setQntQuestoes(questionNr)}
                onClick={() => changeQuantity(questionNr)}
              >
                {questionNr}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="mb-4 text-center font-bold">
          {"Selecione uma das dificuldades".toUpperCase()}
        </h3>
        <div>
          <ul className="mb-4 flex justify-center text-white child:mr-4">
            {difficulties.map((difficultyItem: DifficultyProp) => {
              return (
                <div key={difficultyItem.brName}>
                  {difficultyOption(
                    difficultyItem.name,
                    difficultyItem.brName,
                    changeDifficulty,
                    difficulty
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <div>
          <input
            type="text"
            className="mb-2 h-8 w-48 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={inputRefTitle}
            onChange={handleTitleInput}
            placeholder="Adicione um titulo"
            value={setQuestion.title}
          />
        </div>
      </div>
      <div>
        <div>
          <input
            type="text"
            className="mb-2 h-8 w-48 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={inputRefDesc}
            onChange={handleDescInput}
            placeholder="Adicione uma descrição"
            value={setQuestion.description}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="mb-4 text-center font-bold">
          {"Selecione uma das tags".toUpperCase()}
        </h3>
        <div>
          <Modal
            opened={opened}
            onClose={close}
            centered
            title="ESCOLHA NO MÁXIMO DUAS TAGS"
          >
            <Checkbox.Group value={tagsGeneric} onChange={changeGenericArr}>
              <Grid>
                {allGenericTags.map((tag: { id: number; name: string }) => {
                  return (
                    <Grid.Col span={4} key={tag.id}>
                      <Checkbox
                        value={tag.name}
                        label={tag.name}
                        disabled={
                          tagsGeneric.length === 2 &&
                          !tagsGeneric.includes(tag.name)
                        }
                      />
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Checkbox.Group>
          </Modal>
          <Group position="center">
            <Button className="btn-primary" onClick={open}>
              ESCOLHA PORTAIS GENÉRICOS
            </Button>
          </Group>
          {tagsGeneric.length > 0 && (
            <div className="">
              <Modal
                opened={openSpecModal}
                onClose={closeSpecModal}
                // onClose={() => setOpenSpecModal(false)}
                title="ESCOLHA PELO MENOS DUAS TAGS"
                transitionProps={{ transition: "rotate-left" }}
                trapFocus={false}
              >
                <div className="">
                  <div className="mb-4">
                    <div className=" flex">
                      {/* <input
                        type="text"
                        className="h-8 w-full border border-black px-2 text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        ref={inputRef2}
                        onChange={handleSpecificChange}
                        placeholder="Pesquisar"
                      /> */}
                      <TextInput
                        ref={inputRef2}
                        placeholder={
                          tagsSpec.length === 2
                            ? "Número máximo de tags"
                            : "Pesquisar"
                        }
                        onChange={handleSpecificChange}
                        disabled={tagsSpec.length === 2}
                      />
                      {!(tagsSpec.length === 2) && (
                        <div className="-ml-1" onClick={handleAddSpecific}>
                          <BsArrowRightSquareFill size={32} />
                        </div>
                      )}
                      {errorTagExist && (
                        <p className="pl-4 text-red-600">Tag ja existe!</p>
                      )}
                    </div>

                    <div className="z-20 w-full">
                      {recSpec.length > 0 &&
                        inputRef2?.current?.value !== "" && (
                          <div className="w-full bg-white text-center text-black ring-2 ring-zinc-600">
                            <ul className="grid grid-flow-col grid-rows-4 gap-4 p-2 child:mr-2">
                              {recSpec.map(
                                (recSpec: { id: number; name: string }) => {
                                  return (
                                    <li
                                      key={recSpec.id}
                                      className="cursor-pointer underline underline-offset-1 hover:font-bold"
                                      onClick={() =>
                                        addSpecificTag(recSpec.name)
                                      }
                                    >
                                      {recSpec.name}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                  <div>
                    {storedRecommendedSpec.length > 0 && (
                      <Checkbox.Group
                        value={tagsSpec}
                        onChange={changeSpecificArr}
                      >
                        <Grid>
                          {storedRecommendedSpec.map((tag: string) => {
                            return (
                              <Grid.Col span={4} key={tag}>
                                <Checkbox
                                  value={tag}
                                  label={tag}
                                  checked={tagsSpec.includes(tag)}
                                  disabled={
                                    tagsSpec.length === 2 &&
                                    !tagsSpec.includes(tag)
                                  }
                                />
                              </Grid.Col>
                            );
                          })}
                        </Grid>
                      </Checkbox.Group>
                    )}
                  </div>
                  {/* <div>
                    {allSpecTags.length > 0 && (
                      <Checkbox.Group
                        value={tagsSpec}
                        onChange={changeSpecificArr}
                      >
                        <Grid>
                          {allSpecTags.map((tag: string) => {
                            return (
                              <Grid.Col span={4} key={tag}>
                                <Checkbox
                                  value={tag}
                                  label={tag}
                                  checked={tagsSpec.includes(tag)}
                                  disabled={
                                    tagsSpec.length === 2 &&
                                    !tagsSpec.includes(tag)
                                  }
                                />
                              </Grid.Col>
                            );
                          })}
                        </Grid>
                      </Checkbox.Group>
                    )}
                  </div> */}
                </div>
              </Modal>

              <Button
                className="btn-primary"
                onClick={() => setOpenSpecModal(true)}
              >
                ESCOLHA PORTAIS ESPECÍFICOS
              </Button>
            </div>
          )}
          <button className="btn-primary mt-8" onClick={handleProximo}>
            Proximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionOptions;
