import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tabel_pegawai'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tabel_pegawai', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tabel_pegawai(id_pegawai INTEGER PRIMARY KEY AUTOINCREMENT, nama VARCHAR(15) NOT NULL, golongan INT(11), jabatan VARCHAR(15), nilai_kinerja INT(11))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Tambah Data"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Perbarui Data"
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="Lihat Data"
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="Lihat Semua Data"
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Hapus Data"
              btnColor='#D1503A'
              btnIcon="user-times"
              customClick={() => navigation.navigate('Delete')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;