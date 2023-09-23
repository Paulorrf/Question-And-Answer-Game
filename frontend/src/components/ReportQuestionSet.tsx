import axios from "@/axios";
import { Checkbox, Flex, Group, Button, TextInput } from "@mantine/core";
import { decode } from "jsonwebtoken";
import React, { useRef, useState } from "react";

type Props = {
  closeModal: () => void;
  setReported: React.Dispatch<React.SetStateAction<boolean>>;
  question_set_id: number;
};

const ReportQuestionSet = ({
  closeModal,
  setReported,
  question_set_id,
}: Props) => {
  const [reportar, setReportar] = useState<string[]>([]);
  // const [other, setOther] = useState(false);
  const [error, setError] = useState(false);

  console.log(reportar);

  // const otherValue = useRef<HTMLInputElement>(null);

  async function createReport() {
    const response = await axios({
      method: "post",
      url: `questions/reportSet`,
      data: {
        question_set_id,
        report_reasons: reportar,
        //@ts-ignore
        userId: Number(decode(localStorage?.getItem("user")).sub),
      },
    });
  }

  function reportarQuestoes() {
    if (
      // (!otherValue.current || otherValue.current.value === "") &&
      reportar.length === 0
    ) {
      console.log("ENTROU");
      setError(true);
    } else {
      createReport();
      closeModal();
      // setReported(true);
    }
  }

  return (
    <>
      <Checkbox.Group
        label="Informe o motivo:"
        value={reportar}
        onChange={setReportar}
      >
        {error && <p>Por favor selecione uma das opções para reportar</p>}

        <Group
          className="flex flex-col"
          mt="xs"
          position="left"
          align="flex-start"
        >
          <Checkbox value="possuem palavrões" label="Possuem palavrões" />
          <Checkbox value="possuem erros" label="Possuem erros" />
          <Checkbox
            value="não fazem sentido"
            label="Não fazem sentido/mal formuladas"
          />
        </Group>
      </Checkbox.Group>
      {/* <Group>
        <Flex direction="column" gap="sm">
          <Checkbox
            checked={other}
            onChange={(event) => setOther(event.currentTarget.checked)}
            label="Outro"
            className="mt-[20px]"
          />

          {other && (
            <TextInput ref={otherValue} placeholder="Detalhe o problema" />
          )}
        </Flex>
      </Group> */}

      <Button onClick={reportarQuestoes} className="btn-primary mt-[20px]">
        Enviar
      </Button>
    </>
  );
};

export default ReportQuestionSet;
