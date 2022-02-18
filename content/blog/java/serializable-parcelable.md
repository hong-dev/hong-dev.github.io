---
title: "Serializable vs Parcelable"
date: "2022-02-18T22:22:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Serializable"
  - "Parcelable"
description: "Java Serializable vs Android Parcelable"
socialImage: ""
---


- Object를 serializing 하는 것은 object의 상태를 byte stream으로 변환하는 것을 의미하고, deserializing은 byte stream을 object의 copy로 되돌리는 것을 의미한다.
- Data를 하나의 Activity에서 다른 Activity로 전달해야 하는 경우가 있는데, 이 때 data는 **Intent** object에 담겨서 전달된다. 복잡한 POJO(Plain Old Java Object)를 이동시킬 때에도 object가 전달 가능하도록 만들어야 한다. 이러한 경우에, object는 **Serializable** 이거나 **Parcelable** 이어야 한다.

<br>
<br>

# Serializable

- Standard Java interface이다. Android SDK의 일부가 아니다.
- Java의 automatic serialization process에 의존한다.  
    만약 custom serialization behavior를 원한다면, `writeOjbect()`와 `readObject()` methods를 사용해야 한다.
    

## Pros

- 구현이 간단하다.  
    이 interface를 구현하기만 하면, POJO가 한 Activity에서 다른 Activity로 이동할 준비가 된다.
    
- Marker interface이므로 다른 extra methods를 구현할 필요가 없다.

## Cons

- Process 중에 reflection이 사용된다.
- 많은 추가적인 임시 objects가 생성되므로, 상당한 양의 garbage collection을 만든다.
- Poor performance, battery drain

## Example

```java
import java.io.Serializable;

public class Person implements Serializable {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

<br>
<br>

# Parcelable

- Serializable과 다르게, Android SDK의 일부이다.
- Automatic serialization process가 아닌, custom code를 직접 구현한다.

## Pros

- No reflection
- No garbage collection
- (automatic) Serializable보다 빠르다.

## Cons

- 간단하게 구현할 수 있는 serializable에 비해 구현에 더 많은 시간이 걸린다.
- Boilerplate code 때문에, POJO를 유지하고 이해하는 것이 훨씬 더 어렵다.
- Object를 파일에 저장하도록 만들어지지 않았으므로, object를 파일에 저장하려면 Serializable을 사용해야 한다.
- custom Serializable보다 느리다.

## Example

```java
public class MyParcelable implements Parcelable {
     private int mData;

     public int describeContents() {
         return 0;
     }

     public void writeToParcel(Parcel out, int flags) {
         out.writeInt(mData);
     }

     public static final Parcelable.Creator<MyParcelable> CREATOR
             = new Parcelable.Creator<MyParcelable>() {
         public MyParcelable createFromParcel(Parcel in) {
             return new MyParcelable(in);
         }

         public MyParcelable[] newArray(int size) {
             return new MyParcelable[size];
         }
     };

     private MyParcelable(Parcel in) {
         mData = in.readInt();
     }
 }
```

<br>
<br>

### *Reference*

> [*Parcelable vs Serializable*](https://medium.com/android-news/parcelable-vs-serializable-6a2556d51538)  
> [*Serializable or Parcelable? Why and Which one?*](https://proandroiddev.com/serializable-or-parcelable-why-and-which-one-17b274f3d3bb)  
> [*Parcelable*](https://developer.android.com/reference/android/os/Parcelable#java)
