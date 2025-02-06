export const labelDescription = {
    visitDate: {
      description: 'Waktu ke Posyandu (tanggal/bulan/tahun)',
      result: '2025-2-20',
    },
    usiaDewasaDanLansia: {
      description: 'Usia Dewasa dan Lansia',
      pengukuran: {
        description: 'Hasil Penimbangan / Pengukuran / Pemeriksaan (Jika hasil pemeriksan Tekanan Darah/Gula Darah tergolong tinggi maka dirujuk ke Pustu/Puskesmas)',
        result: {
          beratBadan: {
            description: 'Berat Badan (Kg)',
            result: 70.3,
          },
          tinggiBadan: {
            description: 'Tinggi Badan (Cm)',
            result: 170.1,
          },
          indexMassaTubuh: {
            description: 'Index Massa Tubuh',
            result: {
              description: 'Sangat Kurus (SK)/ Kurus (K)/ Normal (N)/ Gemuk (G)/ Obesitas (O)',
              result: 'Normal (N)',
            },
          },
          lingkarPerut: {
            description: 'Lingkar Perut (Cm)',
            result: 95.2,
          },
          lingkarLenganAtas: {
            description: 'Lingkar Lengan Atas (Cm)',
            result:  40.8,
          },
          tekananDarah: { 
            description: 'Tekanan Darah',
            result: {
              sistole: {
                description: 'Sistole',
                result: 110,
              },
              diastole: {
                description: 'Diastole',
                result: 80,
              },
              result: {
                description: 'Hasil (Rendah/Normal/Tinggi)',
                result: 'Normal',
              }
            },
          }, 
          gulaDarah: {
            description: 'Gula Darah',
            result: {  
              kadarGulaDarahSewaktu: {
                description: 'Kadar Gula Darah Sewaktu mg/dL',
                result: 50,
              },
              result: {
                description: 'Hasil(Rendah/Normal/Tinggi)',
                result: 'Normal',
              },
            }
          },
          testHitungJariTangan: {
            description: 'Test Hitung Jari Tangan',
            result: {
              mataKanan: {
                description: 'Mata Kanan',
                result: {
                  description: 'Normal/Gangguan',
                  result: 'Normal',
                }
              },
              mataKiri: {
                description: 'Mata Kiri',
                result: {
                  description: 'Normal/Gangguan',
                  result: 'Gangguan',
                }
              },
            }
          },
          testBerbisik: {
            description: 'Test Berbisik',
            result: {
              telingaKanan: {
                description: 'Telinga Kanan',
                result: {
                  description: 'Normal/Gangguan',
                  result: 'Normal',
                }
              },
              telingaKiri: {
                description: 'Telinga Kiri',
                result: {
                  description: 'Normal/Gangguan',
                  result: 'Normal',
                }
              },
            }
          }    
        },
      },
      questionerPuma: {
        description: 'Kuesioner PPOK/PUMA (Skoring) ≥ 40 Tahun dan merokok (jika sasaran menjawab dengan score >6 , maka sasaran dirujuk ke Pustu/Puskesmas)',
        result: {
          jenisKelamin: {
            description: 'Jenis Kelamin',
            result: {
              description: 'Pr = 0 Lk = 1',
              result: 1,
            }
          },
          usia: {
            description: 'Usia',
            result: {
              description: '40-49 = 0 50 - 59 = 1 ≥  60 = 2',
              result: 1,
            }
          },
          merokok: {
            description: 'Merokok',
            result: {
              description: 'Tidak = 0 < 20 Bks/Th = 0 20-30 Bks/th = 1 > 30 Bks/Th = 2',
              result: 1,
            }
          },
          question1: {
            description: 'Apakah Anda Pernah merasa napas pendek ketika berjalan lebih cepat pada jalan yang datar atau pada jalan yang sedikit menanjak?',
            result: {
              description: 'Tidak = 0 Ya = 1',
              result: 1,
            }
          },
          question2: {
            description: 'Apakah anda mempunyai dahak yang berasal dari paru atau kesulitan mengeluarkan dahak saat Anda sedang tidak menderita flu?',
            result: {
              description: 'Tidak = 0 Ya = 1',
              result: 1,
            }
          },
          question3: {
            description: 'Apakah anda Biasanya batuk saat Anda sedang tidak menderita flu?',
            result: {
              description: 'Tidak = 0 Ya = 1',
              result: 1,
            }
          },
          question4: {
            description: 'Apakah Dokter atau tenaga kesehatan lainnya pernah meminta Anda untuk melakukan pemeriksaan spirometri atau peakflow meter (meniup ke dalam suatu alat)?',
            result: {
              description: 'Tidak = 0 Ya = 1',
              result: 1,
            }
          },
          pumaScore: {
            description: 'Skor PUMA',
            result: {
              description: '<6 >6 ',
              result: 7,
            }
          },
        },
      },
      wawancaraFaktorRisikoPM: {
        description: 'Skrining Gejala TBC (jika 2 gejala terpenuhi maka dirujuk ke Puskesmas)',
        result: {
          question1: {
            description: 'Batuk terus menerus',
            result: {
              description: '(Ya/Tidak)',
              result: 'Tidak',
            }
          },
          question2: {
            description: 'Demam lebih dari ≥ 2 minggu',
            result: {
              description: '(Ya/Tidak)',
              result: 'Ya',
            }
          },
          question3: {
            description: 'BB tidak naik atau turun  dalam 2 bulan berturut-turut',
            result: {
              description: '(Ya/Tidak)',
              result: 'Tidak',
            }
          },
          question4: {
            description: 'Kontak erat dengan Pasien TBC',
            result: {
              description: '(Ya/Tidak)',
              result: 'Tidak',
            }
          },
        },
      },
      menggunakanKontrasepsi: {
        description: 'Wawancara Usia Dewasa yang menggunakan Alat Kontrasepsi (Pil/Kondom/Lainnya)',
        result: {
          description: '(Ya/Tidak)',
          result: 'Ya',
        }
      },
      edukasi: {
        description: 'Edukasi',
        result: 'Selalu menjaga kesehatan',
      },
      rujukPuskesmas: {
        description: 'Rujuk Pustu/Puskesmas',
        result: {
          description: '(Ya/Tidak)',
          result: 'Ya',
        }
      }
    },
    usiaLansia: {
      description: 'Usia Lansia',
      aks: {
        description: 'Aktifitas Kehidupan Sehari-hari (AKS) (Jika hasil perhitungan skor <20 atau termasuk kelompok Ringan, Sedang, Berat dan Total maka dilakukan rujuk ke Pustu/Puskesmas)',
        result: {
          question1: {
            description: 'Mengendalikan rangsang Buang Air Besar (BAB)',
            result: {
              option1: {
                description: 'Skor 0 Tidak terkendali /tak teratur (perlu pencahar)',
              },
              option2: {
                description: 'Skor 1 Kadang-kadang tak terkendali (1x/minggu)',
              },
              option3: {
                description: 'Skor 2 Terkendali teratur',
              },
              result: 1,
            }
          },
          question2: {
            description: 'Mengendalikan rangsang Buang Air Kecil (BAK)',
            result: {
              option1: {
                description: 'Skor 0 Tidak terkendali atau pakai kateter',
              },
              option2: {
                description: 'Skor 1 Kadang-kadang tak terkendali (hanya 1x/24 jam)',
              },
              option3: {
                description: 'Skor 2 Mandiri',
              },
              result: 2,
            }
          },
          question3: {
            description: 'Membersihkan diri (mencuci wajah, menyikat Rambut, mencukur kumis, sikat gigi) ',
            result: {
              option1: {
                description: 'Skor 0 Butuh pertolongan orang lain',
              },
              option2: {
                description: 'Skor 1 Mandiri',
              },
              result: 2,
            }
          },
          question4: {
            description: 'Penggunaan WC (keluar masuk WC, melepas/memakai celana, cebok, menyiram)',
            result: {
              option1: {
                description: 'Skor 0 Tergantung pertolongan orang lain',
              },
              option2: {
                description: 'Skor 1 Perlu pertolongan pada beberapa Kegiatan tetapi dapat mengerjakan sendiri beberapa kegiatan yang lain',
              },
              option3: {
                description: 'Skor 2 Mandiri',
              },
              result: 2,
            }
          },
          question5: {
            description: 'Makan minum (jika makan harus berupa potongan, dianggap dibantu)',
            result: {
              option1: {
                description: 'Skor 0 Tidak mampu',
              },
              option2: {
                description: 'Skor 1 Perlu ditolong memotong makanan',
              },
              option3: {
                description: 'Skor 2 Mandiri',
              },
              result: 2,
            }
          },
          question6: {
            description: 'Bergerak dari kursi roda ke tempat tidur dan sebaliknya (termasuk duduk di tempat tidur)',
            result: {
              option1: {
                description: 'Skor 0 Tidak mampu',
              },
              option2: {
                description: 'Skor 1 Perlu banyak bantuan untuk bisa duduk (2 orang)',
              },
              option3: {
                description: 'Skor 2 Bantuan minimal 1 orang',
              },
              option4: {
                description: 'Skor 3 Mandiri',
              },
              result: 2,
            }
          },
          question7: {
            description: 'Berjalan di tempat rata (atau jika tidak bisa berjalan, menjalankan kursi roda)',
            result: {
              option1: {
                description: 'Skor 0 Tidak mampu',
              },
              option2: {
                description: 'Skor 1 Bisa (pindah) dengan kursi roda',
              },
              option3: {
                description: 'Skor 2 Berjalan dengan bantuan 1 orang',
              },
              option4: {
                description: 'Skor 3 Mandiri',
              },
              result: 2,
            }
          },
          question8: {
            description: 'Berpakaian (termasuk memasang tali sepatu, Mengencangkan sabuk)',
            result: {
              option1: {
                description: 'Skor 0 Tergantung orang lain',
              },
              option2: {
                description: 'Skor 1 Sebagian dibantu (misal: mengancing baju)',
              },
              option3: {
                description: 'Skor 2 Mandiri',
              },
              result: 2,
            }
          },
          question9: {
            description: 'Naik turun tangga',
            result: {
              option1: {
                description: 'Skor 0 Tidak mampu',
              },
              option2: {
                description: 'Skor 1 Butuh pertolongan',
              },
              option3: {
                description: 'Skor 2 Mandiri',
              },
              result: 2,
            }
          },
          question10: {
            description: 'Mandi',
            result: {
              option1: {
                description: 'Skor 0 Tergantung orang lain',
              },
              option2: {
                description: 'Skor 1 Mandiri',
              },
              result: 2,
            }
          },
          result: {
            description: 'Tingkat Ketergantungan (M/R/S/B/T)',
            result: {
              description: 'Mandiri (M=20) Ringan (R=12-19) Sedang (S=9-11) Berat (B=5-8) Total (T=0-4)',
              result: 'R',
            },
          },
          edukasi: {
            description: 'Edukasi',
            result: 'Jaga kesehatan',
          },
          rujukPuskesmas: {
            description: 'Rujuk Pustu/Puskesmas',
            result: '',
          }
        }
      },
      skilas: {
        description: 'Skrining Lansia Sederhana (SKILAS) (Jika ditemukan 1 jawaban Ya maka sasaran dirujuk ke Pustu/Puskesmas)',
        result: {
          penurunanKognitif: {
            description: 'Penurunan Kognitif',
            result: {
              orientasiWaktuTempat: {
                description: 'Orientasi waktu dan tempat',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              },
              mengulangKetigaKata: {
                description: 'Mengulang ketiga kata',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              },
            },
          },
          keterbatasanMobilisasi: {
            description: 'Keterbatasan Mobilisasi',
            result: {
              berdiriDariKursi: {
                description: 'Tes berdiri dari kursi',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              }
            },
          },
          malnutrisi: {
            description: 'Malnutrisi',
            result: {
              pakaianJadiLonggar: {
                description: 'BB berkurang >3kg dalam 3 bulan terakhir atau pakaian jadi lebih longgar',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Ya',
                },
              },
              hilangNafsuMakan: {
                description: 'Hilang nafsu makan/kesulitan makan',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              },
              lilaKurang: {
                description: 'LiLA < 21 cm',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              },
            },
          },
          gangguanPenglihatan: {
            description: 'Gangguan Penglihatan',
            result: {
              masalahPadaMata: {
                description: 'Masalah pada mata (sulit lihat jauh, membaca, penyakit mata, sedang dalam pengobatan Hipertensi/diabetes)',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              },
              tesMelihat: {
                description: 'Tes Melihat',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Ya',
                },
              },
            },
          },
          gangguanPendengaran: {
            description: 'Gangguan Pendengaran',
            result: {
              tesBisik: {
                description: 'TES BISIK',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                }
              },
            },
          },
          gejalaDepresi: {
            description: 'Gejala Depresi (dalam 2 minggu terakhir)',
            result: {
              sedihTertekan: {
                description: 'Perasaan sedih, tertekan, atau putus asa',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              },
              sedikitMinat: {
                description: 'Sedikit minat atau kesenangan dalam melakukan sesuatu',
                result: {
                  description: 'Ya/Tidak',
                  result: 'Tidak',
                },
              },
            },
          },
          imunisasiCovid: {
            description: 'Imunisasi COVID 19',
            result: {
              description: 'Ya/Tidak',
              result: 'Ya',
            },
          },
          edukasi: {
            description: 'Edukasi',
            result: 'Jaga kesehatan, banyak beraktifitas'
          },
          rujukPuskesmas: {
            description: 'Rujuk Pustu/ Puskesmas',
            result: {
              description: 'Ya/Tidak',
              result: 'Tidak',
            },
          },
        },
      },
    },
  }
  