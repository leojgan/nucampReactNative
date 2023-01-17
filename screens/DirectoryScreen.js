import { FlatList, Text, View } from "react-native"
import { Tile } from "react-native-elements"
import { useSelector } from 'react-redux'
import { Loading } from '../components/LoadingComponent'
import { baseUrl } from "../shared/baseUrl"

const DirectoryScreen = ({ navigation }) => {
    const campsites = useSelector(state => state.campsites)

    const renderDirectoryItem = ({ item: campsite }) => {
        return(
            <Tile
                onPress={ () => navigation.navigate('CampsiteInfo', {campsite}) }
                title={campsite.name}
                caption={campsite.description}
                featured
                imageSrc={{ uri: baseUrl + campsite.image }}
            />
        )
    }

    if (campsites.isLoading) return <Loading />;

    if (campsites.errMess) {
        return (
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        )
    }
    
    return (
        <FlatList
            data = {campsites.campsitesArray}
            renderItem = {renderDirectoryItem}
            keyExtractor = {item => item.id.toString()}
        />
    )
}

export default DirectoryScreen