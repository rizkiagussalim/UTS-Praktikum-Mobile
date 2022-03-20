import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tabel_pegawai where id_pegawai = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('Data pegawai tidak ditemukan !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filter Pegawai" />
          <Mytextinput
            placeholder="Masukkan ID Pegawai"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Cari Pegawai" customClick={searchUser} />
          <View
            style={{
              backgroundColor: '#EEE',
              marginTop: 20,
              padding: 30,
              borderRadius: 10,
              marginLeft: 35,
              marginRight: 35,
            }}>
            <Text>ID : {userData.id_pegawai}</Text>
            <Text>Nama : {userData.nama}</Text>
            <Text>Golongan : {userData.golongan}</Text>
            <Text>Jabatan : {userData.jabatan}</Text>
            <Text>Nilai Kinerja : {userData.nilai_kinerja}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;