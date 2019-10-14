import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import newLinking from 'expo/build/Linking/Linking';

class FetchView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title : 'gitrepo-search',
    });
    state = {
        items : [],
        refreshing : false,
        text : '',
    };
    page = 0;

    fetchRepo(refreshing: boolean = false) {
        const newPage = refreshing ? 1 : this.page + 1;
        fetch(`https://api.github.com/search/repositories?q=${ this.state.text }&page=${ newPage }`)
            .then(res => res.json())
            .then(({ items }) => {
                if (refreshing) {
                    this.setState({ items, refreshing : false });
                } else {
                    this.setState({ items : [...this.state.items, ...items], refreshing : false });
                }
                this.page = newPage;
            });
    }

    navigateToDetail(item) {
        this.props.navigation.navigate('DETAIL', { item });
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.inputWraper }>
                    <TextInput style={ styles.input } onChangeText={ (text) => this.setState({ text }) }></TextInput>
                    <TouchableOpacity onPress={ () => this.fetchRepo(true) }>
                        <Text style={ styles.searchtext }>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data={ this.state.items }
                          renderItem={ ({ item }) =>
                              <TouchableOpacity style={styles.list} onPress={ () => this.navigateToDetail(item) }>
                                  <Text style={ styles.fullName }>
                                      { item.full_name }
                                  </Text>
                                  <View style={ { flexDirection : 'row' } }>
                                      <Image style={ styles.ownerIcon }
                                             source={ { uri : item.owner.avatar_url } }></Image>
                                      <Text style={ styles.ownerName }> { item.owner.login }</Text>
                                  </View>
                              </TouchableOpacity>

                          }
                          keyExtractor={ (item => item.id) }
                          onEndReached={ () => this.fetchRepo(false) }
                          onEndReachedThreshold={ 0.5 }
                          onRefresh={ () => this.fetchRepo(true) }
                          refreshing={ this.state.refreshing }
                ></FlatList>
            </View>);
    }
}


const styles = StyleSheet.create({
        container : {
            flex : 1,
            backgroundColor : '#F5FCFF',
        },
        inputWraper : {
            padding : 10,
            flexDirection : 'row',
            backgroundColor : 'white',
            alignItems : 'center'
        },
        input : {
            flex : 1,
            padding : 10,
            backgroundColor : '#EEE',
            borderRadius : 10
        },
        list : {
            padding : 8,
        },

        searchtext : {
            padding : 10,
        },
        fullName : { fontSize : 20, fontWeight : 'bold', marginBottom : 10 },
        ownerIcon : {
            width : 20, height : 20, borderRadius : 10, marginRight : 5,
        },
        ownerName : { fontSize : 14 },
    })
;

export default FetchView;
