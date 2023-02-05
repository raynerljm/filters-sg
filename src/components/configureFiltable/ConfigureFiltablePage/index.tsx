import { Box, Text } from "@chakra-ui/react";
import type { NextRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import useSheetsData from "../../../hooks/useSheetsData";
import type { HeadingConfig } from "../../../types/configuration";
import {
  initEmptyHeadingConfig,
  encodeConfig,
} from "../../../utils/configuration";
import { ROUTES } from "../../../utils/routes";
import ErrorPage from "../../emptyStates/ErrorPage";
import LoadingPage from "../../emptyStates/LoadingPage";
import BxLeftArrowAlt from "../../icons/BxLeftArrowAlt";
import Navbar from "../../landing/Navbar";
import PageOne from "./PageOne";
import PageThree from "./PageThree";
import PageTwo from "./PageTwo";

type Props = {
  router: NextRouter;
  googleSheetId?: string | string[] | undefined;
  csvKey?: string | string[] | undefined;
};

const ConfigureFiltablePage: FC<Props> = ({
  router,
  googleSheetId,
  csvKey,
}) => {
  const [page, setPage] = useState(1);

  const [configuration, setConfiguration] = useState<HeadingConfig>(
    initEmptyHeadingConfig()
  );
  const { data, headings, firstRow, isLoading, errorMessage } = useSheetsData({
    googleSheetId,
    csvKey,
  });

  const createFiltable = () => {
    const urlConfig = encodeConfig([configuration]);

    if (googleSheetId) {
      void router.push(
        `/${ROUTES.GOOGLE_SHEETS}/${String(
          googleSheetId
        )}?urlConfig=${urlConfig}`
      );
    } else if (csvKey) {
      void router.push(
        `/${ROUTES.CSV}/${String(csvKey)}?urlConfig=${urlConfig}`
      );
    }
  };

  const handleBack = () => {
    if (page === 1) {
      void router.push("/");
    } else {
      setPage((page) => page - 1);
    }
  };

  const handleNext = () => {
    if (page !== 3) {
      setPage((page) => page + 1);
    }
  };

  if (errorMessage !== "") {
    return <ErrorPage errorMessage={errorMessage} />;
  } else if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <Box
        backgroundColor="blue.50"
        display="flex"
        flexDir="row"
        justifyContent="center"
      >
        <Box
          maxW="1440px"
          w="full"
          display="flex"
          justifyContent="center"
          // px="264px" // Gives content max width of 912px
          px="208px" // Gives content max width of 1024px
          // px="148px" // Give content max width of 1144px
        >
          <Box w="full" display="flex" justifyContent="center">
            <Box w="full" position="relative">
              <Box
                top="0"
                right="100%"
                position="absolute"
                display="flex"
                gap="4px"
                alignItems="center"
                mr="50px"
                mt="4px"
                cursor="pointer"
              >
                <BxLeftArrowAlt />
                <Text
                  textStyle="subhead-1"
                  userSelect="none"
                  color="interaction.links.neutral-default"
                  _hover={{ color: "base.content.strong" }}
                  onClick={handleBack}
                >
                  Back
                </Text>
              </Box>
              {page === 1 ? (
                <PageOne
                  data={data}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  handleNext={handleNext}
                />
              ) : null}
              {page === 2 ? (
                <PageTwo
                  data={data}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  handleNext={handleNext}
                />
              ) : null}
              {page === 3 ? (
                <PageThree
                  firstRow={firstRow}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  createFiltable={createFiltable}
                />
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ConfigureFiltablePage;
