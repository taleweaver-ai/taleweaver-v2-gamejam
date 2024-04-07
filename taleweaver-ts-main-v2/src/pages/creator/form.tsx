import { useState, ChangeEvent, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AvatarOptions from './avatarOptions';
import ThemeOptions from './themeOptions';
import ModeOptions from './modeOptions';
import { getAvatars } from "@/utils/openai/avatar";
import { AvatarProps } from "@/types/avatar";
import { useCreateWorld } from "@/utils/world";
import { showLoader, hideLoader } from "@/utils/loader";

const themeAvatars: { [key: string]: Array<AvatarProps> } = {};

const emptyAvatars: Array<AvatarProps> = [
  { id: "", name: "", alias: "", description: "" },
  { id: "", name: "", alias: "", description: "" },
  { id: "", name: "", alias: "", description: "" },
  { id: "", name: "", alias: "", description: "" },
];

export default function CreatorForm() {
  const [validated, setValidated] = useState(false);

  const createWorld = useCreateWorld();

  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    showLoader();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation()
    }
    const title = form.elements["title"].value;
    const description = form.elements["description"].value;
    const mode = form.elements["mode"].value;
    const theme = form.elements["theme"].value;

    const world = {
      title: title,
      description: description,
      mode: mode,
      theme: theme,
      avatars: selectedAvatars
    }
    const createdWorld = await createWorld(world)
    setTimeout(() => {
      // hideLoader();
      if (createdWorld)
        window.location.pathname = `/world/${createdWorld}`
    }, 2000)
  }, [createWorld])

  // Handle avatar update on theme change
  const [avatars, setAvatars] = useState(Array<AvatarProps>);
  const [selectedAvatars, setSelectedAvatars] = useState(Array<AvatarProps>);
  const onThemeChange = (theme: string) => {
    // Empty selected avatars
    setSelectedAvatars([]);
    if (!themeAvatars[theme]) {
      // Set avatar options to empty
      setAvatars(emptyAvatars);
      const form = document.getElementById("creator-form");
      // @ts-ignore
      const title = form.elements["title"].value!; 
      // @ts-ignore
      const description = form.elements["description"].value!;
      getAvatars({ theme: theme, title: title, description: description }).then((avatars: AvatarProps[]) => {
        console.log("form", avatars)
        themeAvatars[theme] = avatars;
        setAvatars(themeAvatars[theme]);
      })
    }
    else
      setAvatars(themeAvatars[theme]);
  }
  const onAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const avatar = avatars.find(avatar => String(avatar.id) === String(event.target.value));
    if (avatar) {
      if (event.target.checked && !selectedAvatars.includes(avatar))
        setSelectedAvatars([...selectedAvatars, avatar]);
      else
        setSelectedAvatars(selectedAvatars.filter(selectedAvatar => selectedAvatar !== avatar));
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} id="creator-form">
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title (max. 50 characters)</Form.Label>
        <Form.Control type="text" placeholder="A magical new adventure" minLength={0} maxLength={50} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description (max. 1000 characters)</Form.Label>
        <Form.Control as="textarea" rows={4} minLength={0} maxLength={1000} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="mode-radio">
        <Form.Label>Choose a mode for your world</Form.Label>
        <div className="d-block">
          <ModeOptions />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="theme-radio">
        <Form.Label>Choose a theme for your world</Form.Label>
        <div className="d-block">
          <ThemeOptions onChange={onThemeChange} />
        </div>
      </Form.Group>

      {avatars.length > 0 &&
        <>
          <Form.Group className="mb-3 d-flex flex-wrap justify-content-center w-100" controlId="avatar-checkbox">
            <Form.Label>Choose upto <b>4 avatars</b> from which tale-weavers can choose</Form.Label>
            <div className="d-flex flex-wrap justify-content-center">
              <AvatarOptions avatars={avatars} onChange={onAvatarChange} />
            </div>
          </Form.Group>

          <div className="d-flex pb-5 mb-4 w-100">
          <Button variant="primary mb-5 mx-auto" type="submit" disabled={selectedAvatars.length === 0}
            style={{ fontSize: "large", fontWeight: "bold" }}>
            Create world!
          </Button>
          </div>
        </>
      }
    </Form>
  );
}
