import Text from 'components/Text';
import DinnerIcon from 'components/icons/DinnerIcon';
import LadleIcon from 'components/icons/LadleIcon';

import styles from './NeedList.module.scss';
import { useRecipeInfoContext } from 'pages/Recipe/Recipe';

function NeedList() {
    const recipeInfoContext = useRecipeInfoContext();

    return (<div className={styles.container}>

        <div className={styles.block}>
            <Text view='p-20' weight='bold'>Ingredients</Text>
            <div className={styles.list}>
                {recipeInfoContext.recipeCont.ingradients.map(item =>
                    <div className={styles.line} key={item.id}>
                        <DinnerIcon color='accent' />
                        <Text view='p-16'>{`${item.amount} ${item.unit} ${item.name}`}</Text>
                    </div>
                )}
            </div>

        </div>

        <div className={styles.separator}>
            <div className={styles.point} />
            <div className={styles.create_line}></div>


        </div>

        <div className={styles.block}>
            <Text view='p-20' weight='bold'>Equipment</Text>
            <div className={styles.list}>
                {recipeInfoContext.recipeCont.equipments.map(item =>
                    <div key={item.id} className={styles.line}>
                        <LadleIcon color='accent' />
                        <Text>{item.name}</Text>
                    </div>
                )}
            </div>
        </div>

    </div>);
}

export default NeedList;