import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "../../components/shared/header/header";
import { TextField } from "../../components/ui/textField/textField";
import { Button } from "../../components/ui/button/button";
import { useCardStore } from "../../store/cardStore";
import styles from "./profile.module.scss";
import { useState, useEffect } from "react";
import { validationSchema } from "./../../shemas/zod";
import { menuItems } from "../../constants/constants";
import { Modal } from "../../components/ui/modal/modal";
import { images } from "./../../assets/icons/index";

type FormData = z.infer<typeof validationSchema>;
type FieldName = keyof FormData;
type FieldConfig = {
  name: FieldName;
  label: string;
  type?: string;
};

const formFields: FieldConfig[] = [
  { name: "name", label: "Имя" },
  { name: "username", label: "Никнейм" },
  { name: "email", label: "Почта", type: "email" },
  { name: "city", label: "Город" },
  { name: "phone", label: "Телефон" },
  { name: "company", label: "Название компании" },
];

export function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cards, updateCard } = useCardStore();
  const userData = cards.find((card) => card.id === Number(id));
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      city: "",
      phone: "",
      company: "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        username: userData.username || "",
        email: userData.email || "",
        city: userData.city || "",
        phone: userData.phone || "",
        company: userData.company || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (formData: FormData) => {
    updateCard(Number(id), formData);
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={images.ArrowLeft} alt="Назад" />
        <p>Назад</p>
      </div>
      <div className={styles.twoColumnLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.userInfo}>
            <img src={images.Chel} alt="Аватар" className={styles.avatar} />
            <div className={styles.userTextInfo}>
              {menuItems.map((item, index) => (
                <div key={index} className={index === 0 ? styles.selected : ""}>
                  <Header header={item.label} size="text2-semibold" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Header header={"Данные профиля"} size="title" />
            <div className={styles.formFields}>
              {formFields.map((field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  register={register}
                  error={errors[field.name]?.message}
                />
              ))}
              <div className={styles.buttonContainer}>
                <Button type="submit" text={"Сохранить"} />
              </div>
            </div>
          </form>
          {isOpen && <Modal setIsOpen={setIsOpen} />}
        </div>
      </div>
    </div>
  );
}
