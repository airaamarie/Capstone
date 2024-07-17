import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    view:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red", 

    },
    txt:{
        // backgroundColor: "black", 
        color: "#fff", 
        fontSize: 80
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
      },
      txt: {
        fontSize: 24,
      },
      dropdownMenu: {
        position: 'absolute',
        top: 60,
        right: 20,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        zIndex: 1000,
      },
      menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
})

export default styles;