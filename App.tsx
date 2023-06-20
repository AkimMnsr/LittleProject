import React, { useState, useEffect} from 'react';
import { StyleSheet, View,  Text, FlatList, ToastAndroid, ScrollView } from 'react-native';
import { Appbar, Button, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Player from './components/Player';
import AddPlayer from './components/AddPlayer';
import DismissKeyboard from './components/DismissKeyboard';
  
export default function App(){ 
  
  const [displayModal, setDisplayModal] = useState<boolean>(false);  
  const [players, setPlayers] = useState<any[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const submitHandler = () => {
    setDisplayModal(false);
  };

  const addingNewPlayer = (name:string, sexe:string, selectedButton:string) => { 
    const idstring:string = Date.now().toString() 
    const Player = {
      key: idstring,
      pseudo: name,
      genre: sexe,
      interaction: selectedButton
    };
    setPlayers((currentPlayers) => [Player, ...currentPlayers]);
    setDisplayModal(false);
    enabledToPlay();
  };

  const deleteProduct = (key:string) => {    
    setPlayers(currentPlayers => {
      return currentPlayers.filter(item => item.key !== key)
    });       
  };

  useEffect(()=>{
    enabledToPlay();
  }, [players]);


  const enabledToPlay = () => {
    players.length > 1 ? setDisabled(false) : setDisabled(true);
  }

  const play = () => {
    ToastAndroid.showWithGravity(
      'Merci d\'avoir testé :) !',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  const onNavBack = () => {
    ToastAndroid.showWithGravity(
      'Désolé mais il n\'y a pour le retour en arrière',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  }

  return (
    <SafeAreaProvider>   

      <Appbar.Header >
        <Appbar.BackAction onPress={onNavBack} />
        <Appbar.Content style={{position: "absolute", right: 115,}}title="Liste des joueurs" />
      </Appbar.Header>  

      <DismissKeyboard>            
        <View style={styles.container}> 

        
        <View style={styles.listContainer}>     
          <FlatList
            style={{ maxHeight: 500 }}
            data={players}
            renderItem={({item}) => <Player pseudo={ item.pseudo } idstring={item.key} genre={item.genre} deleteProduct={deleteProduct}/>}  
          />  
        </View>

        <View style={styles.AddplayerContainer}>        
          <PaperProvider
            settings={{
            rippleEffectEnabled: false
            }}
          >
            <Button  
              textColor="black"
              mode="outlined"           
              labelStyle={styles.buttonTextAddPlayer}
              onPress={() => setDisplayModal(true)}
              style={styles.buttonAddPlayer} 
            >
              Ajouter un joueur
            </Button>
            <View style={styles.containerShadowBoxUn}><Text>Shadow box</Text></View>          
          </PaperProvider>        
        </View>

        <View style={styles.buttonPlayContainer }>
          <Button  
            textColor="black"
            mode="outlined"           
            labelStyle={styles.buttonTextPlay }
            onPress={play}
            style={ disabled? styles.buttonPlay : styles.buttonTextPlayEnabled}
            disabled={disabled}
          >
            JOUER
          </Button>
          <View style={disabled? styles.containerShadowBoxDeux : styles.containerShadowBoxDeuxEnabled }><Text>Shadow box</Text></View>
        </View>
          <AddPlayer  addingNewPlayer={addingNewPlayer} submitHandler={submitHandler} displayModal={displayModal}/>        
        </View>
      </DismissKeyboard>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    justifyContent: "flex-start",
  },

  listContainer:{
    paddingBottom: 10,
    maxHeight: "70%",
  },

  AddplayerContainer: {
    flex:1,
    width:"100%",
    paddingRight:25,
    paddingLeft:25,
    paddingTop:5,
    paddingBottom:5,
  },

  buttonAddPlayer: {
    backgroundColor:"white",
    padding:6,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "black"
  },

  buttonTextAddPlayer: {    
    fontWeight:"bold",
    fontSize:17,
  },

  containerShadowBoxUn: {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: 58,
    top: 5,
    left: -5,
    backgroundColor:"black",
    padding:15,
    borderRadius: 8,
  },

  buttonPlayContainer: {   
    padding:25,
    justifyContent:"center"
  },

  buttonPlay: { 
    backgroundColor:"white",
    padding:10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#999999'
  },  

  buttonTextPlayEnabled: {
    backgroundColor:"white",
    padding:10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'black'
  },

  buttonTextPlay: {
    fontWeight:"bold",
    fontSize:20,
  },

  containerShadowBoxDeux: {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: 68,
    top: 29,
    left: 20,
    backgroundColor: '#999999',
    padding:15,
    borderRadius: 8,
  },

  containerShadowBoxDeuxEnabled : {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: 68,
    top: 29,
    left: 20,
    backgroundColor: 'black',
    padding:15,
    borderRadius: 8,
  },

})


