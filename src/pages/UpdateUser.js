import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  let [namaPegawai, setNamaPegawai] = useState('');
  let [golonganPegawai, setGolonganPegawai] = useState('');
  let [jabatanPegawai, setJabatanPegawai] = useState('');
  let [nilaiKinerja, setNilaiKinerja] = useState('');

  let updateAllStates = (nama, golongan, jabatan, kinerja) => {
    setNamaPegawai(nama);
    setGolonganPegawai(golongan);
    setJabatanPegawai(jabatan);
    setNilaiKinerja(kinerja);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tabel_pegawai where id_pegawai = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.nama,
              res.golongan,
              res.jabatan,
              res.kinerja
            );
          } else {
            alert('Data pegawai tidak ditemukan!');
            updateAllStates('', '', '','');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserId, namaPegawai, golonganPegawai, jabatanPegawai, nilaiKinerja);

    if (!inputUserId) {
      alert('Silahkan masukkan id pegawai!');
      return;
    }
    if (!namaPegawai) {
      alert('Silahkan masukkan nama pegawai!');
      return;
    }
    if (!golonganPegawai) {
      alert('Silahkan masukkan golongan pegawai!');
      return;
    }
    if (!jabatanPegawai) {
      alert('Silahkan masukkan jabatan pegawai!');
      return;
    }
    if (!nilaiKinerja) {
      alert('Silahkan masukkan nilai kinerja pegawai!');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tabel_pegawai set nama=?, golongan=? , jabatan=?, kinerja=? where id_pegawai=?',
        [namaPegawai, golonganPegawai, jabatanPegawai, nilaiKinerja, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sukses',
              'Data pegawai berhasil diperbarui!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Kesalahan dalam memperbarui data pegawai');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext text="Filter Pegawai" />
              <Mytextinput
                placeholder="Masukkan ID Pegawai"
                style={{ padding: 10 }}
                onChangeText={
                  (inputUserId) => setInputUserId(inputUserId)
                }
              />
              <Mybutton
                title="Cari Pegawai"
                customClick={searchUser}
              />
              <Mytextinput
                placeholder="Masukkan Nama Pegawai"
                value={namaPegawai}
                style={{ padding: 10 }}
                onChangeText={
                  (namaPegawai) => setNamaPegawai(namaPegawai)
                }
              />
              <Mytextinput
                placeholder="Masukkan Golongan Pegawai"
                value={'' + golonganPegawai}
                onChangeText={
                  (golonganPegawai) => setGolonganPegawai(golonganPegawai)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={jabatanPegawai}
                placeholder="Masukkan Jabatan Pegawai"
                onChangeText={
                  (jabatanPegawai) => setJabatanPegawai(jabatanPegawai)
                }
                maxLength={225}
                // numberOfLines={5}
                // multiline={true}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Masukkan Nilai Kinerja Pegawai"
                value={'' + nilaiKinerja}
                onChangeText={
                  (nilaiKinerja) => setNilaiKinerja(nilaiKinerja)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mybutton
                title="Perbarui Data Pegawai"
                customClick={updateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;