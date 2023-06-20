import React, { useState, useEffect, useCallback  } from 'react'
import { StyleSheet, View, Modal, TouchableOpacity, Text, TextInput} from 'react-native';
import { SegmentedButtons, IconButton, PaperProvider} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Animated } from 'react-native';

interface AddPlayerProps {
  displayModal: boolean;  
  submitHandler: () => void;
  addingNewPlayer: (name:string, sexe:string, selectedButton:string) => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({submitHandler, displayModal, addingNewPlayer}) => {

  /*Manage name of player*/
  const [name, setName] = useState<string>('');
  /* Manage sexe of player */
  const [selectedValue, setSelectedValue] = useState< 'H' | 'F'>('F');
  /*Use for interaction section */
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [isPressed, setIsPressed] = useState([false, false, false]);
  const bounceValues = useState([new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]);
  /*Manage disabled submit btn  */
  const [isenabled, setIsEnabled] = useState<boolean>(true);

  const testinput = (text:string) => {
    setName(text);
    isenabledbtn();
  }

  const handleSubmitSex = (value : 'H' | 'F') => {    
    setSelectedValue(value);
    isenabledbtn();
  };

  const handleButtonPress = (buttonName: string, index: number) => {  
       
    setSelectedButton(buttonName), () => {
      setIsPressed(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = true;
        return updatedState;
      });
    };    
    Animated.spring(bounceValues[0][index], { toValue: 1.2, friction: 3, useNativeDriver: true }).start(); 
};

  const handlePressOut = ( index: number) => {
    setIsPressed(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = false;
      return updatedState;
    });
    Animated.spring(bounceValues[0][index], { toValue: 1, friction: 3, useNativeDriver: true }).start();
   
  };

  useEffect(() => {
    isenabledbtn();
  }, [selectedButton, name]);

  const isenabledbtn = useCallback(() => {
    console.log('isenable :' + selectedButton)
    if (name.length > 1 && selectedButton){
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  }, [selectedButton, name]);

  const resetValue = () => {
    setName('');
    setSelectedButton('');
    setSelectedValue('F');
  }
  
  const submitEnabled = (pseudo:string, sex:string, selectedButton:string) => {
    addingNewPlayer(pseudo, sex, selectedButton);
    resetValue();
    setIsEnabled(true);
  };

    return (  
      
      <Modal
        visible={displayModal}
        animationType={"slide"}
        hardwareAccelerated={true}
      >
        <SafeAreaProvider>
        <View style={styles.container}> 
          <View style={styles.containerHeader}>
            <Text style={styles.title}>Ajouter un joueur</Text>
            <TouchableOpacity onPress={submitHandler}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>   

          <View style={styles.bodycontainer}>
            {/* Manage Input Text */}
            <View>
              <TextInput
                style={styles.textInput}
                cursorColor='darkgreen'
                textAlign="center"
                value={name}
                onChangeText={name => testinput(name)}
              >                
              </TextInput>
              <View style={styles.viewShadow}>
                <Text>Shadow</Text>
              </View>     
            </View>
             {/* Manage pressable male female */}
                    
              <View style={styles.bodyPressMalorFemale}> 
              <PaperProvider
                settings={{
                rippleEffectEnabled: false
                }}
              >                    
                  <SegmentedButtons
                    value={selectedValue}
                    style={styles.segmentedBtn}                    
                    onValueChange={(selectedValue) => handleSubmitSex(selectedValue)}
                    buttons={[
                      {
                        value: 'H',
                        label: 'Homme', 
                        style: selectedValue === 'H' ? styles.buttonSegmentSelectedM :styles.buttonSegment
                      },
                      {
                        value: 'F',
                        label: 'Femme',
                        style: selectedValue === 'F' ? styles.buttonSegmentSelectedF :styles.buttonSegment
                      },
                    ]}
                  />    
                    
            </PaperProvider>      
              </View>   
            {/* Manage pressable interaction */}
                <Text>J'accepte d'intéragir avec</Text>
            <View style={styles.bodyInteraction}>
              <Animated.View style={styles.animatedView}>
              <View>              
                  <IconButton
                    style={[
                      {backgroundColor: selectedButton === 'male' ? 'black': "#F2F2F2"},
                      {transform: [{ scale: bounceValues[0][0] }]},                    
                    ]}
                    icon="heart"
                    iconColor='skyblue'
                    size={60}
                    onPress={() => handleButtonPress('male', 0)}
                    onPressOut={() => handlePressOut(0)}
                    selected={selectedButton === 'male' ? true : false}
                  />
                <Text style={[
                  {color: selectedButton === 'male' ? 'black': "#F2F2F2"},
                  {textAlign:"center"}
                  ]}>Les Hommes</Text>
              </View>

              <View>
                  <IconButton
                    style={[{backgroundColor: selectedButton === 'female' ? 'black': "#F2F2F2"}, { transform: [{ scale: bounceValues[0][1] }] }]}
                    icon="heart"
                    iconColor='plum'
                    size={60}
                    onPress={() => handleButtonPress('female', 1)}
                    onPressOut={() =>handlePressOut(1)}
                    selected={selectedButton === 'female' ? true : false}
                  />
                <Text style={[
                  {color: selectedButton === 'female' ? 'black': "#F2F2F2"},
                  {justifyContent:"center"}
                  ]}>Les femmes</Text>
              </View>

              <View>                
                  <IconButton
                    style={[{backgroundColor: selectedButton === 'both' ? 'black': "#F2F2F2"}, { transform: [{ scale: bounceValues[0][2] }] }]}
                    icon="heart-multiple"
                    iconColor='red'
                    size={60}
                    onPress={() => handleButtonPress('both', 2)}
                    onPressOut={() => handlePressOut (2)}
                    selected={selectedButton === 'both' ? true : false}
                  />                
                <Text style={[
                  {color: selectedButton === 'both'? 'black': "#F2F2F2"},
                  {textAlign:"center"}
                  ]}>Les deux</Text>
              </View>
              </Animated.View>       
            </View>            
          </View>

          <View style={styles.bodyfooter}>
            <TouchableOpacity 
              style={isenabled ? styles.pressable : styles.pressableTrue }
              disabled={isenabled}
              onPress={() => submitEnabled(name, selectedValue, selectedButton)}
            >
              <Text 
                style={isenabled ? styles.pressableText : styles.pressableTextTrue}>VALIDER</Text>
            </TouchableOpacity>
            <View style={isenabled ? styles.pressableShadow : styles.pressableShadowTrue }>
              <Text>Shadow</Text>
            </View>            
          </View>
        </View>  
        </SafeAreaProvider> 
      </Modal>
       
    )
}


const styles = StyleSheet.create({
  container : {
    flex:1,  
  },

  // HEADER SECTION

  containerHeader : {
    flexDirection:"row",
    padding: 10,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },

  closeButton:{
    fontWeight:"bold"
  },

  closeButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },

  // BODY SECTION

  bodycontainer: {
    flex:1,
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 15
  },

  // TextInput part

  textInput: {
    backgroundColor: "white",
    padding:13,
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 20,
    fontWeight:"bold"
  },

  viewShadow: {
    zIndex: -10,
    position: 'absolute',
    backgroundColor: "black",
    borderRadius:10,
    top: 3,
    left: -3,
    height: 65,
    width: "100%",
    padding: 13
  },

  // male or female part

  bodyPressMalorFemale: {
    height:60,
    marginTop: 30,
    marginBottom: 10,
  },

  segmentedBtn: {
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center"
  },

  buttonSegment: {
    backgroundColor: "#F2F2F2",
    padding:10,
    borderRadius: 8,
    borderWidth:0
  },

  buttonSegmentSelectedM: {
    backgroundColor: "skyblue",
    borderWidth:0,
    borderRadius: 8,    
    padding: 10

  },

  buttonSegmentSelectedF: {
    backgroundColor: "plum",
    borderWidth: 0,
    borderRadius: 8,
    padding: 10,
  },
  // interaction part

  bodyInteraction: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  animatedView: {
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-around"
  },

  textInteract: {
    textAlign:"center",    
    fontWeight:"500"
  },

  bodyfooter : {
    padding: 25,
  },

  pressable:{
    position: "relative",
    padding: 17,
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
    borderColor:'#999999'
  },

  pressableTrue: {
    position: "relative",
    padding: 17,
    backgroundColor: "black",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
    borderColor:'black'
  },

  pressableText: {
    color:'#999999',
    fontWeight: "bold",
    fontSize: 20
  },

  pressableTextTrue: {
    color:'white',
    fontWeight: "bold",
    fontSize: 20
  },

  pressableShadow: {
    zIndex: -10,
    position: 'absolute',
    backgroundColor:'#999999',
    borderRadius:10,
    top: 30,
    left: 21,
    height: 68,
    width: "100%",
    padding: 17
  },

  pressableShadowTrue: {
    zIndex: -10,
    position: 'absolute',
    backgroundColor:'black',
    borderRadius:10,
    top: 30,
    left: 21,
    height: 68,
    width: "100%",
    padding: 17
  },

});

export default AddPlayer;