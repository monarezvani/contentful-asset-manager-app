import { Flex, Spinner } from "@contentful/f36-components";
import { styles } from "./Loading.styles";

export const Loading = () => {
    return (
        <Flex className={styles.container}>
            <Spinner variant="primary" />
        </Flex>
    );
};

export default Loading;
