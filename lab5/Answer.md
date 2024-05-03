# Answer


Name: 陶國華
ID: 511558016


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |

| Heap out-of-bounds   |     O    |  O   |
| Stack out-of-bounds  |     X    |  O   |
| Global out-of-bounds |     X    |  O   |
| Use-after-free       |     O    |  O   |
| Use-after-return     |     X    |  O   |

| Heap out-of-bounds   |          |      |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |


### Heap out-of-bounds
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
int main() {
    int *array = malloc(8 * sizeof(int));
    int x = array[8];
    array[8] = 0xff;
    free(array);
    return 0;
}


```
#### Valgrind Report
```

valgrind --leak-check=full --show-leak-kinds=all ./abc 
==48460== Memcheck, a memory error detector
==48460== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==48460== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==48460== Command: ./abc
==48460== 
==48460== Invalid read of size 4
==48460==    at 0x109163: main (abc.c:7)
==48460==  Address 0x4a4c060 is 0 bytes after a block of size 32 alloc'd
==48460==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==48460==    by 0x10915A: main (abc.c:6)
==48460== 
==48460== Invalid write of size 4
==48460==    at 0x109171: main (abc.c:8)
==48460==  Address 0x4a4c060 is 0 bytes after a block of size 32 alloc'd
==48460==    at 0x4840808: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==48460==    by 0x10915A: main (abc.c:6)
==48460== 
==48460== 
==48460== HEAP SUMMARY:
==48460==     in use at exit: 0 bytes in 0 blocks
==48460==   total heap usage: 1 allocs, 1 frees, 32 bytes allocated
==48460== 
==48460== All heap blocks were freed -- no leaks are possible
==48460== 
==48460== For lists of detected and suppressed errors, rerun with: -s
==48460== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
=======


```
### ASan Report
```

gcc -fsanitize=address -o abcc abc.c 

./abcc   
=================================================================
==50791==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x503000000060 at pc 0x5573b0df91da bp 0x7fff8e4128a0 sp 0x7fff8e412898                               
READ of size 4 at 0x503000000060 thread T0                                          
    #0 0x5573b0df91d9 in main (/home/kali/lab5/abcc+0x11d9) (BuildId: 2fddbac3746d5f1c0d2f19ce007ae0af080189d8)
    #1 0x7f69ffc46189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f69ffc46244 in __libc_start_main_impl ../csu/libc-start.c:381
    #3 0x5573b0df90c0 in _start (/home/kali/lab5/abcc+0x10c0) (BuildId: 2fddbac3746d5f1c0d2f19ce007ae0af080189d8)

0x503000000060 is located 0 bytes after 32-byte region [0x503000000040,0x503000000060)                                                                                  
allocated by thread T0 here:                                                        
    #0 0x7f69ffef3bd7 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5573b0df919a in main (/home/kali/lab5/abcc+0x119a) (BuildId: 2fddbac3746d5f1c0d2f19ce007ae0af080189d8)
    #2 0x7f69ffc46189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/kali/lab5/abcc+0x11d9) (BuildId: 2fddbac3746d5f1c0d2f19ce007ae0af080189d8) in main
Shadow bytes around the buggy address:
  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x503000000000: fa fa 00 00 00 fa fa fa 00 00 00 00[fa]fa fa fa
  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==50791==ABORTING
=======


```

### Stack out-of-bounds
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
int main(){
    int array[8];
    int value = array[8];
    array[8] = 0xff;
    return 0;
}
=======


```
#### Valgrind Report
```

valgrind --leak-check=full --show-leak-kinds=all ./abc
==55661== Memcheck, a memory error detector
==55661== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==55661== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==55661== Command: ./abc
==55661== 
==55661==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==55661== 
==55661== HEAP SUMMARY:
==55661==     in use at exit: 0 bytes in 0 blocks
==55661==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==55661== 
==55661== All heap blocks were freed -- no leaks are possible
==55661== 
==55661== For lists of detected and suppressed errors, rerun with: -s
==55661== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
./abc 
=================================================================
==55960==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7f6e33e00040 at pc 0x5652c621420b bp 0x7ffcb4aa65e0 sp 0x7ffcb4aa65d8                              
READ of size 4 at 0x7f6e33e00040 thread T0                                          
    #0 0x5652c621420a in main (/home/kali/lab5/abc+0x120a) (BuildId: 9d05730070ae9d4e0ab311b010c1bde163710b44)
    #1 0x7f6e35e46189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f6e35e46244 in __libc_start_main_impl ../csu/libc-start.c:381
    #3 0x5652c62140a0 in _start (/home/kali/lab5/abc+0x10a0) (BuildId: 9d05730070ae9d4e0ab311b010c1bde163710b44)

Address 0x7f6e33e00040 is located in stack of thread T0 at offset 64 in frame
    #0 0x5652c6214178 in main (/home/kali/lab5/abc+0x1178) (BuildId: 9d05730070ae9d4e0ab311b010c1bde163710b44)

  This frame has 1 object(s):
    [32, 64) 'array' (line 6) <== Memory access at offset 64 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/kali/lab5/abc+0x120a) (BuildId: 9d05730070ae9d4e0ab311b010c1bde163710b44) in main
Shadow bytes around the buggy address:
  0x7f6e33dffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33dffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33dffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33dfff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33dfff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f6e33e00000: f1 f1 f1 f1 00 00 00 00[f3]f3 f3 f3 00 00 00 00
  0x7f6e33e00080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33e00100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33e00180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33e00200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f6e33e00280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==55960==ABORTING
=======

```
### ASan Report
```

```

### Global out-of-bounds
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
int array[8];
int main(){
    int value = array[8];
    array[8] = 0xff;
    return 0;
}
```
#### Valgrind Report
```
valgrind --leak-check=full --show-leak-kinds=all ./abc
==57531== Memcheck, a memory error detector
==57531== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==57531== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==57531== Command: ./abc
==57531== 
==57531==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==57531== 
==57531== HEAP SUMMARY:
==57531==     in use at exit: 0 bytes in 0 blocks
==57531==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==57531== 
==57531== All heap blocks were freed -- no leaks are possible
==57531== 
==57531== For lists of detected and suppressed errors, rerun with: -s
==57531== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
./abc                                                 
=================================================================
==57727==ERROR: AddressSanitizer: global-buffer-overflow on address 0x560d9c6e4100 at pc 0x560d9c6e11b3 bp 0x7fff4eea1e00 sp 0x7fff4eea1df8                             
READ of size 4 at 0x560d9c6e4100 thread T0                                          
    #0 0x560d9c6e11b2 in main (/home/kali/lab5/abc+0x11b2) (BuildId: 74801b66a444e57def9a542dc0f1afcd8ce33cb0)
    #1 0x7f0e0ec46189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f0e0ec46244 in __libc_start_main_impl ../csu/libc-start.c:381
    #3 0x560d9c6e10b0 in _start (/home/kali/lab5/abc+0x10b0) (BuildId: 74801b66a444e57def9a542dc0f1afcd8ce33cb0)

0x560d9c6e4100 is located 0 bytes after global variable 'array' defined in 'abc.c:3:5' (0x560d9c6e40e0) of size 32                                                      
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/kali/lab5/abc+0x11b2) (BuildId: 74801b66a444e57def9a542dc0f1afcd8ce33cb0) in main
Shadow bytes around the buggy address:
  0x560d9c6e3e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e3f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e3f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e4000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e4080: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x560d9c6e4100:[f9]f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e4180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e4200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e4280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e4300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x560d9c6e4380: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==57727==ABORTING
=======

```
#### Valgrind Report
```

```
### ASan Report
```


```

### Use-after-free
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
int main() {
    int *array = malloc(8 * sizeof(int));
    free(array);
    array[0] = 0xff;
    return 0;
}
```
#### Valgrind Report
```
 valgrind --leak-check=full --show-leak-kinds=all ./abc
==58639== Memcheck, a memory error detector
==58639== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==58639== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==58639== Command: ./abc
==58639== 
==58639==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==58639== 
==58639== HEAP SUMMARY:
==58639==     in use at exit: 0 bytes in 0 blocks
==58639==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==58639== 
==58639== All heap blocks were freed -- no leaks are possible
==58639== 
==58639== For lists of detected and suppressed errors, rerun with: -s
==58639== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
./abc                                                 
=================================================================
==58755==ERROR: AddressSanitizer: heap-use-after-free on address 0x503000000040 at pc 0x56504322d1d2 bp 0x7ffcd6fd7480 sp 0x7ffcd6fd7478                                
WRITE of size 4 at 0x503000000040 thread T0                                         
    #0 0x56504322d1d1 in main (/home/kali/lab5/abc+0x11d1) (BuildId: 4d3563b92fca7f7b89928bc23ec7bc92a53932e6)
    #1 0x7ffaec846189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ffaec846244 in __libc_start_main_impl ../csu/libc-start.c:381
    #3 0x56504322d0b0 in _start (/home/kali/lab5/abc+0x10b0) (BuildId: 4d3563b92fca7f7b89928bc23ec7bc92a53932e6)

0x503000000040 is located 0 bytes inside of 32-byte region [0x503000000040,0x503000000060)                                                                              
freed by thread T0 here:                                                            
    #0 0x7ffaecaf2878 in free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x56504322d19a in main (/home/kali/lab5/abc+0x119a) (BuildId: 4d3563b92fca7f7b89928bc23ec7bc92a53932e6)
    #2 0x7ffaec846189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7ffaecaf3bd7 in malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x56504322d18a in main (/home/kali/lab5/abc+0x118a) (BuildId: 4d3563b92fca7f7b89928bc23ec7bc92a53932e6)
    #2 0x7ffaec846189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/kali/lab5/abc+0x11d1) (BuildId: 4d3563b92fca7f7b89928bc23ec7bc92a53932e6) in main
Shadow bytes around the buggy address:
  0x502ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x502fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x503000000000: fa fa 00 00 00 fa fa fa[fd]fd fd fd fa fa fa fa
  0x503000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x503000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==58755==ABORTING
=======

```
#### Valgrind Report
```

```
### ASan Report
```


```

### Use-after-return
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
int *array;

int* uar() {
    int tmp[8];
    array = tmp;
    return array;
}

int main() {
    int *array = uar();
    array[0] = 0xff;
    return 0;
}
```
#### Valgrind Report
```
 valgrind --leak-check=full --show-leak-kinds=all ./abc
==59577== Memcheck, a memory error detector
==59577== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==59577== Using Valgrind-3.20.0 and LibVEX; rerun with -h for copyright info
==59577== Command: ./abc
==59577== 
==59577==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==59577== 
==59577== HEAP SUMMARY:
==59577==     in use at exit: 0 bytes in 0 blocks
==59577==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==59577== 
==59577== All heap blocks were freed -- no leaks are possible
==59577== 
==59577== For lists of detected and suppressed errors, rerun with: -s
==59577== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
./abc                                                 
=================================================================
==59710==ERROR: AddressSanitizer: stack-use-after-return on address 0x7fb952d00020 at pc 0x5565aa6312a4 bp 0x7ffce4c15ab0 sp 0x7ffce4c15aa8                             
WRITE of size 4 at 0x7fb952d00020 thread T0                                         
    #0 0x5565aa6312a3 in main (/home/kali/lab5/abc+0x12a3) (BuildId: d9d4e79aef1cf9d78f1b9bdd3a62e9e8a0ad361c)
    #1 0x7fb954c46189 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb954c46244 in __libc_start_main_impl ../csu/libc-start.c:381
    #3 0x5565aa6310c0 in _start (/home/kali/lab5/abc+0x10c0) (BuildId: d9d4e79aef1cf9d78f1b9bdd3a62e9e8a0ad361c)

Address 0x7fb952d00020 is located in stack of thread T0 at offset 32 in frame
    #0 0x5565aa631198 in uar (/home/kali/lab5/abc+0x1198) (BuildId: d9d4e79aef1cf9d78f1b9bdd3a62e9e8a0ad361c)

  This frame has 1 object(s):
    [32, 64) 'tmp' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/home/kali/lab5/abc+0x12a3) (BuildId: d9d4e79aef1cf9d78f1b9bdd3a62e9e8a0ad361c) in main
Shadow bytes around the buggy address:
  0x7fb952cffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952cffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952cffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952cfff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952cfff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7fb952d00000: f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 00 00 00 00
  0x7fb952d00080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952d00100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952d00180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952d00200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fb952d00280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
==59710==ABORTING
=======

```
#### Valgrind Report
```

```
### ASan Report
```


```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

#include <stdio.h>
#include <stdlib.h>
int main(){
    int a[8];
    int b[8];
    a[16] = 0xff;
    return 0;
}
```
### Why
redzone是在變數分配時在記憶體前後取一段記憶體加上防護偵測overflow，
此例a、b皆為32bytes，a右側與b左側都為redzone，對齊記憶體排列及設計該段redzone為32bytes，
故a[8]~a[15]為redzone，a[16] == b[0]。
=======

```
### Why

