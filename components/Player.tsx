import React from 'react'
import { StyleSheet, Text, View, Pressable, Image} from 'react-native';

interface ProductsProps {
  deleteProduct: (idString: string) => void;
  idstring: string;
  pseudo: string; 
  genre: string;
};

const Player: React.FC<ProductsProps> = ({pseudo, deleteProduct, idstring, genre}) => {
    return (
        
          <View style={[styles.items, {backgroundColor: genre === 'H' ? "skyblue" : 'plum'}]}>
            <Image style={styles.icone} source={require('../assets/heartPlayer.png')} />
            <Text style={styles.elements} >{pseudo}</Text> 
            <Pressable 
              style={styles.pressableArea}
              onPress={() => deleteProduct(idstring)} 
            >
              <Text style={styles.cross} >X</Text> 
            </Pressable>  
          </View>  
    )
}

const styles = StyleSheet.create({  
   
    items : {
      marginTop: 15,
      flexDirection: "row",
      alignItems:"center",
      justifyContent: "space-between",
      marginRight: 30,
      marginLeft: 30,
      borderRadius: 8,
      paddingRight: 20,
      paddingLeft: 20,
      borderWidth:3
    },
  
    elements: {
      padding: 12,      
      fontSize: 20,
      marginVertical: 4,
      borderRadius: 8,
      fontWeight:"bold",
    },

    icone: {
      height: 40,
      width:40,
    },

    cross: {
      fontWeight: "bold",
      fontSize: 17,
      color:"grey"
    },

    pressableArea: {
      padding: 10
    }
  });
  
export default Player;







