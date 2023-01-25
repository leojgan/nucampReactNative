import { useDispatch, useSelector } from 'react-redux';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Avatar, ListItem } from 'react-native-elements'
import { SwipeRow } from 'react-native-swipe-list-view'
import Loading from '../components/LoadingComponent'
import { toggleFavorite } from '../features/favorites/favoritesSlice'
import { baseUrl } from '../shared/baseUrl'

const FavoritesScreen = ({ navigation }) => {
    const { campsitesArray, isLoading, errMess } = useSelector(state => state.campsites)
    const dispatch = useDispatch()    
    const favorites = useSelector(state => state.favorites)

    const renderFavoriteItem = ({ item: campsite }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                <View style = {styles.deleteView}>
                    <TouchableOpacity
                        style = {styles.deleteTouchable}
                        onPress = { () => Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite campsite ' + campsite.name + '?',
                            [{
                                text: 'Cancel',
                                onPress: () => console.log('Campsite deletion was cancelled.'),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => dispatch(toggleFavorite(campsite.id))
                            }],
                            { cancelable: false }
                        )}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        onPress = { () => navigation.navigate('Directory', {
                            screen: 'CampsiteInfo',
                            params: { campsite }
                        })}
                        >
                        <Avatar rounded source={{ uri: baseUrl+campsite.image }} />
                        <ListItem.Content>
                            <ListItem.Title>{campsite.name}</ListItem.Title>
                            <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        )
    }

    if (isLoading) {
        return <Loading />
    }
    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        )
    }
    return (
        <Animatable.View
        animation = 'fadeInRightBig'
        duration = {2000}
    >
            <FlatList
                data = { campsitesArray.filter(campsite => favorites.includes(campsite.id)) }
                renderItem = { renderFavoriteItem }
                keyExtractor = { item => item.id.toString() }
            />
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
})

export default FavoritesScreen