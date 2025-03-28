import Text from "components/Text";
import RecipeBox from "./components/RecipeBox";
import styles from './RecipesList.module.scss';

function RecipesList() {
    return <div>
        <img className={styles.baner} src='src/assets/baner.png' />
        <Text className={styles.description} tag='p' view='p-20' color='primary'>
            Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to <u>holiday feasts</u>.
        </Text>
        <RecipeBox />
    </div>
}

export default RecipesList;