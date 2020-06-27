import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAY1BMVEVCZ7L///86YrB/lMYqWawzXq4nV6xAZbG+x+DZ3uxQcLb5+vzT2eovW62YqdFaebtngr3i5/Kotth4jsSSpM7Fz+XN1Oezv92gsNaHmsqKncpuh8AgU6rt8PdifrwARqUTTajWj94OAAAB/0lEQVRoge3b7XKCMBAF0BBJAkiCoIhWpH3/p2y0X4NEaDfZ2Hb2/mbmEIeQXcZlSZLUpmLxUpnamixJjOYqoqu4NhfXiJjqVRYmYbWOzVpY18zw6Cxj3LAq/nLtgmM+yBQKhUK5RnGhdZpqGyEE51zhnwBKSLnZNVm7t2mzrjnsjtuKS1yVy6G51DCT5CmmKp5yF2pT4rlKb51LRXaV6u6qiC4vyhkWzeXF/d8Y0VVsnsVyRTvPIrlit8DiuKpYP8RN53YQnvuN5aK44rDIorhyYQ8huapaZjFc28o+xNWZU8qb1WnzGYSesz871HrohS1vvhKcZdK12BS9l1eFwy0iFHLDlG0xq6n38NPUPUb4YsK3UzfGFxO+mroxvsK5XI3POl3k7uCuG+FxJpdccv+UK0fpHefCs7xJgBtRRZmP4qhib67I89L/zemsL5ZSh3CXu5JJAhQgILfzPxlBrhGPcVf+BRfIHfwLH4i7DtAvgNzemwW5AbYvyM2CvCd/7jb+2wjk7gL0LRA3wPaFuOsA2xfingt/FuQGeKwg52+I7WvdbJz9FOrGVwQ4jS4Ro0hHffUyvgSl+///dSy55JJLLrnkkksuueSSSy655JJL7m9z/f5tAXRV5TmPA3S58Zw/grmX+SO/eSuQe5238psvA7gf82Ve83QA922e7hVSHB5yd+LjhAAAAABJRU5ErkJggg=='}} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Logo);
