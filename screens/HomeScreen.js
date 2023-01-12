import { CAMPSITES } from '../shared/campsites'
import { Card } from 'react-native-elements'
import { PARTNERS } from '../shared/partners'
import { PROMOTIONS } from '../shared/promotions'
import { ScrollView, Text, View } from 'react-native'
import { useState } from 'react'

const FeaturedItem = ({ item }) => {
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={item.image}>
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
    const [campsites, setCampsites] = useState(CAMPSITES)
    const [partners, setPartners] = useState(PARTNERS)
    const [promotions, setPromotions] = useState(PROMOTIONS)

    const featuredCampsite = campsites.find(item => item.featured)
    const featuredPartner = partners.find(item => item.featured)
    const featuredPromotion = promotions.find(item => item.featured)
    
    return (
        <ScrollView>
            <FeaturedItem item={featuredCampsite} />
            <FeaturedItem item={featuredPromotion} />
            <FeaturedItem item={featuredPartner} />
        </ScrollView>
    )
}

export default HomeScreen