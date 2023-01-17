import { ScrollView, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

const FeaturedItem = ({ item }) => {
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={{ uri: baseUrl+item.image }}>
                    <View style={{ justifyContent: 'center' , flex: 1 }} >
                        <Text style={{ color: 'white' , textAlign: 'center' , fontSize: 20 , textShadowColor: 'black' , textShadowOffset:{ width:1, height:1 } , textShadowRadius:5 }}>
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>
                    {item.description}
                </Text>
            </Card>
        )
    } else {
        return <View />
    }
}

const HomeScreen = () => {
    const campsites = useSelector((state)=>state.campsites)
    const promotions = useSelector((state)=>state.promotions)
    const partners = useSelector((state)=>state.partners)
    
    const featuredCampsite = campsites.campsitesArray.find(item => item.featured)
    const featuredPromotion = promotions.promotionsArray.find(item => item.featured)
    const featuredPartner = partners.partnersArray.find(item => item.featured)
    
    return (
        <ScrollView>
            <FeaturedItem item={featuredCampsite} />
            <FeaturedItem item={featuredPromotion} />
            <FeaturedItem item={featuredPartner} />
        </ScrollView>
    )
}

export default HomeScreen